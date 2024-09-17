"use server";

import { getBusiness } from "@/data-access";
import { getSubscription } from "@/data-access/subscription";
import { authenticationProcedure } from "@/lib/procedures";
import { z } from "zod";
import { ZSAError } from "zsa";

export const getSubscriptionsAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;

    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }
    const subscription = await getSubscription(business?.id);
    return { success: true, data: subscription };
  });

export const getSubscriptionAction = authenticationProcedure
  .createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const subscription = await getSubscription(input);
    return { success: true, data: subscription };
  });
