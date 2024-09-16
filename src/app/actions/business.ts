"use server";

import { getBusiness } from "@/data-access";
import { authenticationProcedure } from "@/lib/procedures";

export const getBusinessAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);

    return { success: true, data: business };
  });
