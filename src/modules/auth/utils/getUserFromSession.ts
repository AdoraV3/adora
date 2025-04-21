"use server";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getUserIdFromSession(): Promise<string | null> {
  const authCookie = cookies().get("adora-auth-cookie")?.value;

  if (!authCookie) {
    return null;
  }

  try {
    const { user } = await lucia.validateSession(authCookie);
    return user?.id ?? null;
  } catch (error) {
    return null;
  }
}
