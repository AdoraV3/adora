import { createId } from "@paralleldrive/cuid2";
import { integer, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "../utils";

export const subscriptionPlanPeriod = ["monthly", "yearly"] as const;
export const paymentProvider = ["stripe", "paystack"] as const;

export const subscriptionPlanEnum = [
  "basic",
  "standard",
  "premium",
  "enterprise",
] as const;

export const subscription = pgTable("subscription", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  plan: varchar("subscription_plan", {
    enum: subscriptionPlanEnum,
  }).default("basic"),
  description: text("description").default(""),
  period: varchar("subscription_period", {
    enum: subscriptionPlanPeriod,
  }).default("monthly"),
  amount: integer("amount").default(0),
  currency: varchar("currency", { length: 3 }).default("USD"),
  priceId: varchar("price_id", { length: 255 }),
  paymentLink: varchar("payment_link", { length: 255 }),
  paymentProvider: varchar("payment_provider", {
    enum: paymentProvider,
  }),
  features: text("features").array(),
  totalAllowedCalls: integer("total_allowed_calls"),
});

export type Subscription = typeof subscription.$inferSelect;
export type NewSubscription = typeof subscription.$inferInsert;
