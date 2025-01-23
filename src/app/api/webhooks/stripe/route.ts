import { updateBusiness } from "@/data-access";
import { unAssignPhoneNumber } from "@/data-access/availablePhoneNumber";
import { getPlan } from "@/data-access/subscription";
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
            status: 500,
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

        if (!findBusiness) {
          return NextResponse.json({
            status: 404,
            error: "business not found",
          });
        }
        if (!findBusiness?.stripeCustomerId) {
          await updateBusiness(findUser.id, {
            stripeCustomerId: customerId,
          });
        }

        const lineItems = session.line_items?.data || [];

        await updateSubscriptions(findBusiness, lineItems);

        break;
      }
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id,
        );

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
        const basicPlan = await getPlan("basic");
        updateBusiness(business.userId, {
          subscriptionId: basicPlan?.id,
          subscriptionStartDate: undefined,
        });

        await unAssignPhoneNumber(business?.id);

        break;
      }
      case "customer.subscription.updated": {
        // Placeholder for handling subscription updates (e.g., expired)
        const subscription = event.data.object as Stripe.Subscription;

        // console.log(
        //   `Subscription updated for customer ${subscription.customer}: ${subscription.status}`,
        // );

        // Check for expiration or status changes (e.g., past_due, canceled)
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

          const basicPlan = await getPlan("basic");
          if (!basicPlan) {
            console.error("Basic plan not found");
            return new Response("Basic plan configuration error", {
              status: 500,
            });
          }

          // Downgrade business to the basic plan
          await updateBusiness(business.userId, {
            subscriptionId: basicPlan.id,
            subscriptionStartDate: undefined,
          });

          await unAssignPhoneNumber(business.id);

          // console.log(
          //   `Business ${business.id} downgraded due to subscription status`,
          // );
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
