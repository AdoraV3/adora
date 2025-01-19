"use server";

import {
  getBusiness,
  getUserByEmail,
  updateBusiness,
  updateProfile,
} from "@/data-access";
import { db } from "@/db";
import { agent } from "@/db/schema";
import { sendContactUsEmail } from "@/emails";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { profileSchema } from "@/modules/home/components/profile/validation";
import { contactUsSchema } from "@/modules/landing-page/validation";
import { VapiClient } from "@vapi-ai/server-sdk";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { ZSAError, createServerAction } from "zsa";

export const updateUserProfileAction = authenticationProcedure
  .createServerAction()
  .input(profileSchema)
  .handler(async ({ input, ctx }) => {
    await RateLimiterUtility.limit(RateLimitConfig.API_CALL);
    const { id } = ctx;
    const { name, phoneNumber, country, businessName, businessCountry } = input;

    const profile = await updateProfile(id, {
      name,
      country,
      phone: phoneNumber,
    });

    const existingBusiness = await getBusiness(id);

    if (!existingBusiness) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }

    const updatedBusinessInfo = await updateBusiness(id, {
      name: businessName,
      country: businessCountry,
    });

    const existingAgent = await db.query.agent.findFirst({
      where: eq(agent.id, existingBusiness.agentId),
      with: {
        phoneNumber: true,
      },
    });

    // await getAgent(existingBusiness.agentId);
    if (!existingAgent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }

    try {
      const client = new VapiClient({ token: env.VAPI_API_KEY });

      await client.phoneNumbers.update(existingAgent?.phoneNumber?.vapiId, {
        fallbackDestination: {
          type: "number",
          number: phoneNumber,
        },
      });
    } catch (error) {
      console.error({ error });
    }

    return { data: { profile, updatedBusinessInfo }, success: true };
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
