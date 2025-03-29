"use server";

import {
  createAccount,
  createProfile,
  createUser,
  createVerifyEmailToken,
  deleteSessionForUser,
  verifyEmail,
} from "@/data-access";

import { getAccount } from "@/data-access/account";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { sendVerificationEmail } from "@/emails";
import { lucia } from "@/lib/auth";
import { createTransaction } from "@/lib/create-transaction";
import { googleOAuthClient } from "@/lib/googleAuth";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { authSchema, otpSchema, registerSchema } from "@/validations/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { ZSAError, createServerAction } from "zsa";

export const signupAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const { password, email, name } = input;

    await RateLimiterUtility.limit(RateLimitConfig.SIGNUP);

    const passwordHash = await new Argon2id().hash(password);

    const user = await db.query.user.findFirst({
      where: eq(userTable.email, email),
    });

    if (user) {
      throw new ZSAError("NOT_AUTHORIZED", "Email already in use");
    }

    createTransaction(async trx => {
      const [newUser] = await createUser(
        {
          email,
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

      const token = await createVerifyEmailToken(newUser.userId, trx);

      await sendVerificationEmail({
        token,
        to: email,
        name,
      });
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

    if (!account?.password) {
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

export const verifyEmailAction = createServerAction()
  .input(otpSchema)
  .handler(async ({ input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.SIGNUP);
    const { otp: token } = input;

    return verifyEmail(token);
  });
