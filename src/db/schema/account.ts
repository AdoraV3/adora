import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const accountTypeEnum = ["email", "google"] as const;

export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  type: text("account_type", { enum: accountTypeEnum })
    .notNull()
    .default("email"),
  googleId: text("google_id").unique(),
  ...lifecycleDates,
});

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
