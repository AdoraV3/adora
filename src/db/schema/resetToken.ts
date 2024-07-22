import { createId } from "@paralleldrive/cuid2";
import { text, timestamp, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const resetToken = pgTable("reset_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: varchar("token"),
  tokenExpiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  ...lifecycleDates,
});
