import { getBusiness } from "@/data-access";
import { db } from "@/db";
import { Business, user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { lucia } from "./auth";

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user: sessionUser } = await lucia.validateSession(sessionId);
  try {
    if (session?.fresh) {
      // refreshing their session cookie
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {
    console.error(error);
  }

  if (!sessionUser) {
    return null;
  }
  return db.query.user.findFirst({
    where: eq(userTable?.id, sessionUser.id),
  });
};

export const getCurrentUser = cache(async () => {
  const session = await getUser();
  if (!session?.id) {
    return undefined;
  }
  return session?.id;
});

type ActionWithTeamFunction<T> = (
  formData: FormData,
  businessData: Business,
) => Promise<T>;

export function withBusiness<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const currentUser = await getUser();
    if (!currentUser) {
      redirect("/login?from=/pricing");
    }
    const business = await getBusiness(currentUser.id);
    if (!business) {
      throw new Error("Business not found");
    }

    return action(formData, business);
  };
}
