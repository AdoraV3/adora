"use server";

import {
  createAccount,
  createBusinessProfile,
  createProfile,
  createVerifyEmailToken,
  verifyEmail,
} from "@/data-access";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { sendVerificationEmail } from "@/emails";
import { lucia } from "@/lib/auth";
import { googleOAuthClient } from "@/lib/googleAuth";
import { authSchema, otpSchema, registerSchema } from "@/validations/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { ZSAError, createServerAction } from "zsa";

export const signupAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const { password, email, name, businessName } = input;
    const passwordHash = await new Argon2id().hash(password);

    const result = await db.query.user.findFirst({
      where: eq(userTable.email, email),
    });

    if (result) {
      throw new ZSAError("NOT_AUTHORIZED", "Email already in use");
    }

    const [newUser] = await db
      .insert(userTable)
      .values({
        email,
        password: passwordHash,
      })
      .returning({ userId: userTable.id });

    createBusinessProfile({
      name: businessName,
      userId: newUser.userId,
    });

    createProfile({
      userId: newUser.userId,
      name,
    });

    createAccount({
      userId: newUser.userId,
      type: "email",
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
      where: eq(userTable.email, email),
    });

    if (!user || !user?.password) {
      throw new ZSAError("NOT_AUTHORIZED", "Invalid email or password");
    }

    if (!user.emailVerified) {
      throw new ZSAError("NOT_AUTHORIZED", "Please verify your email");
    }

    const isPasswordValid = await new Argon2id().verify(
      user?.password,
      password,
    );

    if (!isPasswordValid) {
      throw new ZSAError("NOT_AUTHORIZED");
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

export const logOut = async () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
};

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
