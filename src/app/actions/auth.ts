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
import { assistantConfig } from "@/mock";
import { authSchema, otpSchema, registerSchema } from "@/validations/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { ZSAError, createServerAction } from "zsa";
import { createAssistant, updateVapiPhoneNumber } from "./vapi";

export const signupAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const categoryId = "y98v27l2jt1jficxxkopbozr";
    const selectedPhoneNumberId = "h24oavsvf2t23qhx8khh19k6";
    const selectedVoice = "ca9tbdzulr7zkhscbg8l17bt";
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

    const isPhoneNumberAvailable =
      await db.query.availablePhoneNumber.findFirst({
        where: and(
          eq(availablePhoneNumber.id, selectedPhoneNumberId),
          eq(availablePhoneNumber.isAssigned, false),
        ),
      });

    if (!isPhoneNumberAvailable) {
      throw new ZSAError("NOT_AUTHORIZED", "Phone number not available");
    }

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
      name: `Adora-${businessName}`,
      firstMessage: `Hello, Thank you for calling ${businessName}. My name is Adora How may I help you today?`,
    };

    const response = await createAssistant(payload);

    const voice = await getVoice(selectedVoice);
    if (!voice) {
      throw new ZSAError("NOT_FOUND", "Selected voice not available");
    }

    updateVapiPhoneNumber(isPhoneNumberAvailable.vapiId, {
      assistantId: response.id,
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
          assistantId: response.id,
          name: `Adora-${businessName}`,
          phoneNumberId: selectedPhoneNumberId,
          voiceId: voice.id,
          provider: voice.provider,
          categoryId,
        },
        trx,
      );

      await updatePhoneNumber(
        selectedPhoneNumberId,
        { isAssigned: true, dateAssigned: new Date()?.toISOString() },
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
