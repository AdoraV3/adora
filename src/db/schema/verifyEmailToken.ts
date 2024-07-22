import { createId } from "@paralleldrive/cuid2";
import { text, timestamp } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const verifyEmailToken = pgTable("verify_email_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token"),
  tokenExpiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  ...lifecycleDates,
});
