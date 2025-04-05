import { updateVapiPhoneNumber } from "@/app/actions/vapi";
import { getBusinessWithAgentPhoneNumber, updateBusiness } from "@/data-access";
import { getAgent } from "@/data-access/agents";
import {
  getAvailablePhoneNumberById,
  unAssignPhoneNumber,
  updatePhoneNumber,
} from "@/data-access/availablePhoneNumber";
import { db } from "@/db";
import { business as businessTable, user as userTable } from "@/db/schema";
import { stripe, updateSubscriptions } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") ?? "";
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          },
        );

        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (!customerDetails?.email) {
          return NextResponse.json({
            status: 404,
            error: "Customer email could not be fetched",
          });
        }

        const findUser = await db.query.user.findFirst({
          where: eq(userTable.email, customerDetails.email),
        });

        if (!findUser) {
          return NextResponse.json({
            status: 404,
            error: "user not found",
          });
        }

        const findBusiness = await db.query.business.findFirst({
          where: eq(businessTable.userId, findUser.id),
        });

        if (!findBusiness || !findBusiness?.agentId) {
          return NextResponse.json({
            status: 404,
            error: "business not found",
          });
        }

        const existingAgent = await getAgent(findBusiness?.agentId);
        if (!existingAgent) {
          return NextResponse.json({
            status: 404,
            error: "Agent not found",
          });
        }

        const isPhoneNumberAvailable = await getAvailablePhoneNumberById(
          existingAgent?.phoneNumberId,
        );

        if (!isPhoneNumberAvailable) {
          return NextResponse.json({
            status: 404,
            error: "Phone number not available",
          });
        }

        await updateBusiness(findUser.id, {
          stripeCustomerId: customerId,
        });

        const phoneNumber = await getBusinessWithAgentPhoneNumber(
          findBusiness?.id,
        );

        if (!phoneNumber) {
          return NextResponse.json({
            status: 404,
            error: "Phone number not found",
          });
        }

        await updateVapiPhoneNumber(isPhoneNumberAvailable?.vapiId, {
          assistantId: existingAgent?.assistantId,
        });

        await updatePhoneNumber(phoneNumber?.id, {
          isAssigned: true,
          dateAssigned: new Date()?.toISOString(),
        });

        const lineItems = session.line_items?.data || [];

        await updateSubscriptions(findBusiness, lineItems);

        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        const business = await db.query.business.findFirst({
          where: eq(
            businessTable.stripeCustomerId,
            subscription.customer as string,
          ),
        });

        if (!business) {
          return NextResponse.json({
            status: 404,
            error: "business not found",
          });
        }

        await updateBusiness(business.userId, {
          subscriptionId: null,
          subscriptionStartDate: null,
          subscriptionEndDate: null,
          stripeCustomerId: null,
        });

        await unAssignPhoneNumber(business?.userId);

        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;

        if (
          subscription.status === "past_due" ||
          subscription.status === "canceled"
        ) {
          const business = await db.query.business.findFirst({
            where: eq(
              businessTable.stripeCustomerId,
              subscription.customer as string,
            ),
          });

          if (!business) {
            return NextResponse.json({
              status: 404,
              error: "Business not found",
            });
          }

          await updateBusiness(business.userId, {
            subscriptionId: null,
            subscriptionStartDate: null as unknown as string,
            subscriptionEndDate: null as unknown as string,
            stripeCustomerId: null,
          });

          await unAssignPhoneNumber(business.userId);
        }

        break;
      }

      default:
        console.warn(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
