"use server";

import {
  createAccount,
  createBusiness,
  createProfile,
  createUser,
  createVerifyEmailToken,
  deleteSessionForUser,
  verifyEmail,
} from "@/data-access";

import { getAccount } from "@/data-access/account";
import { createAgent } from "@/data-access/agents";
import { updatePhoneNumber } from "@/data-access/availablePhoneNumber";
import { getVoice } from "@/data-access/voices";
import { db } from "@/db";
import {
  availablePhoneNumber,
  subscription,
  systemPrompt as systemPromptTable,
  user as userTable,
} from "@/db/schema";
import { sendVerificationEmail } from "@/emails";
import { lucia } from "@/lib/auth";
import { createTransaction } from "@/lib/create-transaction";
import { googleOAuthClient } from "@/lib/googleAuth";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { formatDateToCustomFormat } from "@/modules/commons/utils/helpers";
import { authSchema, otpSchema, registerSchema } from "@/validations/auth";
import { VapiClient } from "@vapi-ai/server-sdk";
import { generateCodeVerifier, generateState } from "arctic";
import { and, eq } from "drizzle-orm";
import { env } from "env.mjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { ZSAError, createServerAction } from "zsa";
import { updateVapiPhoneNumber } from "./vapi";

export const signupAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const {
      password,
      email,
      name,
      businessName,
      category,
      voice,
      phone,
      agentName,
    } = input;

    await RateLimiterUtility.limit(RateLimitConfig.SIGNUP);

    const passwordHash = await new Argon2id().hash(password);

    const result = await db.query.user.findFirst({
      where: eq(userTable.email, email),
    });

    const categoryResult = await db.query.systemPrompt.findFirst({
      where: eq(systemPromptTable.id, category),
    });

    if (result) {
      throw new ZSAError("NOT_AUTHORIZED", "Email already in use");
    }

    const isPhoneNumberAvailable =
      await db.query.availablePhoneNumber.findFirst({
        where: and(
          eq(availablePhoneNumber.id, phone),
          eq(availablePhoneNumber.isAssigned, false),
        ),
      });

    if (!isPhoneNumberAvailable) {
      throw new ZSAError("NOT_AUTHORIZED", "Phone number not available");
    }

    const basicSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.plan, "basic"),
    });

    if (!basicSubscription?.priceId) {
      throw new ZSAError("NOT_FOUND", "Subscription not found");
    }
    const findVoice = await getVoice(voice);
    if (!findVoice) {
      throw new ZSAError("NOT_FOUND", "Selected voice not available");
    }

    const client = new VapiClient({ token: env.VAPI_API_KEY });

    const newAssistant = await client.assistants.create({
      model: {
        messages: [
          {
            role: "system",
            content: categoryResult?.systemPrompt as string,
          },
        ],
        model: "gpt-4",
        provider: "openai",
      },
      name: agentName,
      voice: {
        provider: "11labs",
        voiceId: findVoice?.createdVoiceId,
      },
      firstMessage: `Hello, Thank you for calling ${businessName}. My name is ${agentName} How may I help you today?`,
    });

    updateVapiPhoneNumber(isPhoneNumberAvailable.vapiId, {
      assistantId: newAssistant?.id,
    });
    let token = "";

    await createTransaction(async trx => {
      const [newUser] = await createUser(
        {
          email,
        },
        trx,
      );
      const [newAgent] = await createAgent(
        {
          assistantId: newAssistant.id,
          name: agentName,
          phoneNumberId: phone,
          voiceId: findVoice.id,
          provider: findVoice.provider,
          categoryId: category,
        },
        trx,
      );

      await updatePhoneNumber(
        phone,
        { isAssigned: true, dateAssigned: new Date()?.toISOString() },
        trx,
      );

      const endDate = new Date();
      const subscriptionEndDate = new Date(endDate);
      subscriptionEndDate.setDate(endDate.getDate() + 3);

      await createBusiness(
        {
          name: businessName,
          userId: newUser.userId,
          subscriptionId: basicSubscription?.id,
          agentId: newAgent.agentId,
          subscriptionStartDate: formatDateToCustomFormat(new Date()),
          subscriptionEndDate: formatDateToCustomFormat(subscriptionEndDate),
          isFreeTrial: true,
        },
        trx,
      );

      await createProfile(
        {
          userId: newUser.userId,
          name,
        },
        trx,
      );

      await createAccount(
        {
          userId: newUser.userId,
          type: "email",
          password: passwordHash,
        },
        trx,
      );

      token = await createVerifyEmailToken(newUser.userId, trx);
    });

    await sendVerificationEmail({
      token,
      to: "stemitope370@gmail.com",
      // to: email,
      name,
    });

    return { success: true };
  });

export const loginInAction = createServerAction()
  .input(authSchema)
  .handler(async ({ input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.LOGIN);
    const { password, email } = input;
    const user = await db.query.user.findFirst({
      where: and(eq(userTable.email, email), eq(userTable.emailVerified, true)),
    });

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED", "User not registered");
    }

    if (!user.emailVerified) {
      throw new ZSAError("NOT_AUTHORIZED", "Please verify your email");
    }

    const account = await getAccount(user?.id);

    if (!account || !account?.password) {
      throw new ZSAError("NOT_AUTHORIZED", "Invalid email or password");
    }

    const isPasswordValid = await new Argon2id().verify(
      account?.password,
      password,
    );

    if (!isPasswordValid) {
      throw new ZSAError("NOT_AUTHORIZED", "Invalid email or password");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { user, success: true };
  });

export const logOutAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    await deleteSessionForUser(id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/login");
  });

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("google_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      },
    );
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};

// export const updatePreferenceAction = authenticationProcedure
//   .createServerAction()
//   .input(
//     z.object({
//       emailNotification: z.boolean(),
//     }),
//   )
//   .handler(({ input, ctx }) => {});

export const verifyEmailAction = createServerAction()
  .input(otpSchema)
  .handler(async ({ input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.SIGNUP);
    const { otp: token } = input;

    return verifyEmail(token);
  });
