// @see https://github.com/unkeyed/unkey/blob/main/internal/db/src/schema/util/lifecycle_dates.ts

import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

import { dbPrefix } from "./constant";

export const lifecycleDates = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
};

export function generateOTP() {
  const otpArray = new Uint8Array(4);
  crypto.getRandomValues(otpArray);
  return Array.from(otpArray, num => num % 10).join("");
}

/**
 * This lets us use the multi-project schema feature of Drizzle ORM. So the same
 * database instance can be used for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator(name => `${dbPrefix}_${name}`);
