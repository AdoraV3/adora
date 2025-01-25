"use server";

import { getUserByEmail } from "@/data-access";
import { db } from "@/db";
import { user } from "@/db/schema";
import { sendContactUsEmail } from "@/emails";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { contactUsSchema } from "@/modules/landing-page/validation";
import { eq } from "drizzle-orm";
import { ZSAError, createServerAction } from "zsa";

export const getUserAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    const existingUser = await getUserByEmail(email);
    return { success: true, data: existingUser };
  });

export const sendContactUsAction = createServerAction()
  .input(contactUsSchema)
  .handler(async ({ input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.API_CALL);
    const { fullName, businessName, email, phoneNumber, message } = input;
    await sendContactUsEmail({
      name: fullName,
      businessName,
      email,
      phone: phoneNumber,
      message,
    });
  });

export const getUserProfileAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const findProfile = await db.query.user.findFirst({
      where: eq(user.id, id),
      with: {
        profile: true,
      },
    });
    if (!findProfile) {
      throw new ZSAError("NOT_FOUND", "Profile not found");
    }

    return { success: true, data: findProfile };
  });
