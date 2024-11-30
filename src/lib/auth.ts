import { getBusiness } from "@/data-access";
import { db } from "@/db";
import { Business, session, user } from "@/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { env } from "env.mjs";
import { Lucia } from "lucia";
import { redirect } from "next/navigation";
import { getUser } from "./get-user";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "adora-auth-cookie",
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

type ActionWithTeamFunction<T> = (
  formData: FormData,
  businessData: Business,
) => Promise<T>;

export function withBusiness<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect("/login");
    }
    const business = await getBusiness(user.id);
    if (!business) {
      throw new Error("Business not found");
    }

    console.log("business", formData.get("priceId"));

    return action(formData, business);
  };
}
