/* eslint-disable sonarjs/no-duplicate-string */
import { createAccountViaGoogle, createProfile } from "@/data-access";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { googleOAuthClient } from "@/lib/googleAuth";
import { eq } from "drizzle-orm";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// http://localhost:3000/api/auth/google/callback
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("no code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const codeVerifier = cookies().get("google_code_verifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("no code verifier or state");
    return new Response("Invalid Request", { status: 400 });
  }

  if (state !== savedState) {
    console.error("state mismatch");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
    code,
    codeVerifier,
  );
  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const googleData = (await googleResponse.json()) as {
    id: string;
    email: string;
    name: string;
    picture: string;
    verified_email: boolean;
  };

  let id = "";

  // if the email exists in our record, we can create a cookie for them and sign them in
  // if the email doesn't exist, we create a new user, then craete cookie to sign them in

  const existingUser = await db.query.user.findFirst({
    where: eq(userTable.email, googleData.email),
  });

  if (!existingUser) {
    const [newUser] = await db
      .insert(userTable)
      .values({
        email: googleData?.email ?? "",
        emailVerified: googleData?.verified_email ?? false,
      })
      .returning({ userId: userTable.id });

    await createProfile({
      name: googleData?.name ?? "",
      avatar: googleData?.picture ?? "",
      userId: newUser?.userId ?? "",
    });

    createAccountViaGoogle(newUser.userId, googleData.id);

    id = newUser?.userId ?? "";
  } else {
    id = existingUser?.id;
  }

  const session = await lucia.createSession(id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/home");
}
