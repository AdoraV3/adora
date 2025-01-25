"use server";

import { createStripeCheckoutSession } from "./stripe";
import { withBusiness } from "./withBusiness";

export const checkoutAction = async (formData: FormData) => {
  const handler = await withBusiness(async (data, business) => {
    const priceId = data.get("priceId") as string;
    if (!priceId) {
      throw new Error("Price ID is required");
    }
    return createStripeCheckoutSession({ business, priceId });
  });

  return handler(formData);
};
