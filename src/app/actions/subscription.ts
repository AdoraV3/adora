"use server";

import { getSubscription, getSubscriptions } from "@/data-access/subscription";
import { withBusiness } from "@/lib/get-user";
import { authenticationProcedure } from "@/lib/procedures";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { z } from "zod";
import { createServerAction } from "zsa";

// export const getSubscriptionsAction = authenticationProcedure
//   .createServerAction()
//   .handler(async ({ ctx }) => {
//     const { id } = ctx;

//     const business = await getBusiness(id);
//     if (!business) {
//       throw new ZSAError("NOT_FOUND", "Business not found");
//     }
//     const subscription = await getSubscription(business?.id);
//     return { success: true, data: subscription };
//   });

export const getSubscriptionAction = authenticationProcedure
  .createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const subscription = await getSubscription(input);
    return { success: true, data: subscription };
  });

export const getSubscriptionsAction = createServerAction().handler(async () => {
  const subscriptions = await getSubscriptions();
  return { success: true, subscriptions };
});

export const checkoutAction = withBusiness(async (formData, business) => {
  const priceId = formData.get("priceId") as string;

  if (!priceId) return;
  await createStripeCheckoutSession({ business, priceId });
});
