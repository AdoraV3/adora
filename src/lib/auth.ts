import { db } from "@/db";
import { session, user } from "@/db/schema";
import { ADORA_AUTH_COOKIE_NAME } from "@/modules/commons/utils/constant";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { env } from "env.mjs";
import { Lucia } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, session as any, user as any);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: ADORA_AUTH_COOKIE_NAME,
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
