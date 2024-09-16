import { updateBusiness } from "@/data-access";
import { getPlan, getSubscriptionByPriceId } from "@/data-access/subscription";
import { db } from "@/db";
import {
  Business,
  business as businessTable,
  user as userTable,
} from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { formatDateToCustomFormat } from "@/modules/commons/utils/helpers";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

// async function getCustomerEmail(customerId: string): Promise<string | null> {
//   try {
//     const customer = await stripe.customers.retrieve(customerId);
//     return (customer as Stripe.Customer).email;
//   } catch (error) {
//     console.error("Error fetching customer:", error);
//     return null;
//   }
// }

async function updateSubscriptions(
  business: Business,
  lineItems: Stripe.LineItem[],
) {
  const updates = lineItems.map(async item => {
    const priceId = item.price?.id;
    const isSubscription = item.price?.type === "recurring";

    if (!priceId) {
      throw new Error("Invalid priceId");
    }
    const findSubscription = await getSubscriptionByPriceId(priceId);

    if (isSubscription) {
      const endDate = new Date();
      if (findSubscription?.period === "yearly") {
        endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
      } else if (findSubscription?.period === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
      } else {
        throw new Error("Invalid priceId");
      }

      // Create or update the subscription
      updateBusiness(business?.userId, {
        subscriptionId: findSubscription?.id,
        subscriptionStartDate: formatDateToCustomFormat(new Date()),
        subscriptionEndDate: formatDateToCustomFormat(endDate),
      });
    } else {
      // Handle one-time purchase logic here if necessary
    }
  });

  await Promise.all(updates);
}

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

        // const customerEmail = await getCustomerEmail(
        //   subscription.customer as string,
        // );

        // if (!customerEmail) {
        //   return NextResponse.json({
        //     status: 500,
        //     error: "Customer email could not be fetched",
        //   });
        // }
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
