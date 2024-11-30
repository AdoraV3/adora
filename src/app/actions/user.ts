"use server";

import {
  createBusiness,
  getBusiness,
  getUserByEmail,
  updateBusiness,
  updateProfile,
} from "@/data-access";
import { getPlan } from "@/data-access/subscription";
import { sendContactUsEmail } from "@/emails";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { profileSchema } from "@/modules/home/components/profile/validation";
import { contactUsSchema } from "@/modules/landing-page/validation";
import { ZSAError, createServerAction } from "zsa";

export const updateUserProfileAction = authenticationProcedure
  .createServerAction()
  .input(profileSchema)
  .handler(async ({ input, ctx }) => {
    const { id } = ctx;
    const { name, phoneNumber, country, businessName, businessCountry } = input;
    const profile = await updateProfile(id, {
      name,
      country,
      phone: phoneNumber,
    });
    let businessProfile;

    const findBusinessProfile = await getBusiness(id);
    if (!findBusinessProfile) {
      const basicPlan = await getPlan("basic");

      if (!basicPlan) {
        throw new ZSAError("NOT_FOUND", "Subscription not found");
      }

      businessProfile = await createBusiness({
        name: businessName,
        country: businessCountry,
        userId: id,
        subscriptionId: basicPlan.id,
        agentId: "wo4lm1obd1tahizoxgj64ef3",
      });
    } else {
      businessProfile = await updateBusiness(id, {
        name: businessName,
        country: businessCountry,
      });
    }

    return { data: { profile, businessProfile }, success: true };
  });

export const getUserAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    const user = await getUserByEmail(email);
    return { success: true, data: user };
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
