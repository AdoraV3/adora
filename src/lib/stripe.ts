import { updateBusiness } from "@/data-access";
import { getSubscriptionByPriceId } from "@/data-access/subscription";
import { db } from "@/db";
import { Business, user } from "@/db/schema";
import { FREE_TRIAL_DAYS } from "@/modules/commons/utils/constant";
import { formatDateToCustomFormat } from "@/modules/commons/utils/helpers";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function createStripeCheckoutSession({
  business,
  priceId,
}: {
  business: Business | null;
  priceId: string;
}) {
  if (!business) {
    redirect(`/register?redirect=checkout&priceId=${priceId}`);
  }

  const findUser = await db.query.user.findFirst({
    where: eq(user.id, business.userId),
  });

  if (!findUser) {
    redirect(`/register?redirect=checkout&priceId=${priceId}`);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${env.NEXT_PUBLIC_URL}/api/checkout/stripe?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_URL}/pricing`,
    client_reference_id: business.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: FREE_TRIAL_DAYS,
    },
    ...(findUser.email
      ? { customer_email: findUser.email }
      : {
          customer: business.stripeCustomerId ?? undefined,
        }),
  });

  redirect(session.url!);
}

export async function updateSubscriptions(
  business: Business,
  lineItems: Stripe.LineItem[] | Stripe.SubscriptionItem[],
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
        isFreeTrial: false,
      });
    } else {
      // Handle one-time purchase logic here if necessary
    }
  });

  await Promise.all(updates);
}
