import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../../env.mjs";

import * as schema from "./schema";

const client = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => {} : undefined,
});
export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === "development",
});
