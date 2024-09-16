import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const accountPreference = pgTable("account_preference", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  theme: text("theme"),
  language: text("language"),
  timezone: text("timezone"),
  ...lifecycleDates,
});

export type AccountPreference = typeof accountPreference.$inferSelect;
export type NewAccountPreference = typeof accountPreference.$inferInsert;
