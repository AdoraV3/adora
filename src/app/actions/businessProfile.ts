"use server";

import { getBusinessProfile, getProfile } from "@/data-access";
import { authenticationProcedure } from "@/lib/procedures";

export const getBusinessProfileAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const businessProfile = await getBusinessProfile(id);
    const profile = await getProfile(id);
    return { success: true, data: { businessProfile, profile } };
  });
