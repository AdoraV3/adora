"use server";

import { getUserByEmail } from "@/data-access";
import {
  createAccountPreference,
  getAccountPreference,
} from "@/data-access/accountPreference";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { accountPreferenceSchema } from "@/modules/home/account-settings/schema";
import { ZSAError } from "zsa";

export const createAccountPreferenceAction = authenticationProcedure
  .createServerAction()
  .input(accountPreferenceSchema)
  .handler(async ({ ctx, input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.API_CALL);

    const { country, timezone } = input;

    const { email } = ctx;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new ZSAError("NOT_FOUND", "User not found");
    }

    await createAccountPreference({ country, timezone, userId: user?.id });
  });

export const getAccountPreferenceAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new ZSAError("NOT_FOUND", "User not found");
    }

    const accountPreference = await getAccountPreference(
      user?.accountPreferences?.id,
    );
    return { success: true, data: accountPreference };
  });
