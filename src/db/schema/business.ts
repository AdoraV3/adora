import { createId } from "@paralleldrive/cuid2";
import { integer, text, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const subscriptionPlanEnum = [
  "basic",
  "starter",
  "premium",
  "enterprise",
] as const;

export const business = pgTable("business", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  logo: varchar("logo", { length: 255 }),
  plan: varchar("subscription_plan", {
    enum: subscriptionPlanEnum,
  })
    .notNull()
    .default("basic"),
  customerBase: integer("customer_base"),
  country: varchar("country", { length: 255 }),
  ...lifecycleDates,
});

export type Business = typeof business.$inferSelect;
export type NewBusiness = typeof business.$inferInsert;
