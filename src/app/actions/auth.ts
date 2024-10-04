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
import { db } from "@/db";
import {
  subscription,
  systemPrompt as systemPromptTable,
  user as userTable,
} from "@/db/schema";
import { sendVerificationEmail } from "@/emails";
import { lucia } from "@/lib/auth";
import { createTransaction } from "@/lib/create-transaction";
import { googleOAuthClient } from "@/lib/googleAuth";
import { authenticationProcedure } from "@/lib/procedures";
import { assistantConfig } from "@/mock";
import { authSchema, otpSchema, registerSchema } from "@/validations/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { ZSAError, createServerAction } from "zsa";
import { createAssistant } from "./vapi";

export const signupAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const categoryId = "bypwo5ayo1b5yi952ocezipg";
    const { password, email, name, businessName } = input;
    const passwordHash = await new Argon2id().hash(password);

    const result = await db.query.user.findFirst({
      where: eq(userTable.email, email),
    });

    const categoryResult = await db.query.systemPrompt.findFirst({
      where: eq(systemPromptTable.id, categoryId),
    });

    if (result) {
      throw new ZSAError("NOT_AUTHORIZED", "Email already in use");
    }
    const [newUser] = await createUser({
      email,
    });
    const basicSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.plan, "basic"),
    });

    if (!basicSubscription) {
      throw new ZSAError("NOT_FOUND", "Subscription not found");
    }
    const payload = {
      ...assistantConfig,
      model: {
        ...assistantConfig.model,
        messages: [
          {
            role: "system",
            content: categoryResult?.systemPrompt,
          },
        ],
      },
      name: "Adora",
      firstMessage: `Hello, Thank you for calling ${businessName}. My name is Adora How may I help you today?`,
    };

    const response = await createAssistant(payload);
    await createTransaction(async trx => {
      const [newAgent] = await createAgent(
        {
          assistantId: response.id,
          name: "Adora",
        },
        trx,
      );

      await createBusiness(
        {
          name: businessName,
          userId: newUser.userId,
          subscriptionId: basicSubscription?.id,
          agentId: newAgent.agentId,
        },
        trx,
      );
    });

    await createProfile({
      userId: newUser.userId,
      name,
    });

    await createAccount({
      userId: newUser.userId,
      type: "email",
      password: passwordHash,
    });

    const token = await createVerifyEmailToken(newUser.userId);
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
  .handler(({ input }) => {
    const { otp: token } = input;

    return verifyEmail(token);
  });
