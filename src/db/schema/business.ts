import { createId } from "@paralleldrive/cuid2";
import { integer, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { agent } from "./agent";
import { subscription } from "./subscription";
import { user } from "./user";

export const business = pgTable("business", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  logo: varchar("logo", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  customerBase: integer("customer_base"),
  country: varchar("country", { length: 255 }),
  subscriptionStartDate: timestamp("subscription_start_date", {
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  subscriptionEndDate: timestamp("subscription_end_date", { mode: "string" })
    .notNull()
    .defaultNow(),
  subscriptionId: text("subscription_id")
    .notNull()
    .references(() => subscription.id, { onDelete: "cascade" }),
  agentId: text("agent_id")
    .notNull()
    .references(() => agent.id, { onDelete: "cascade" }),
  ...lifecycleDates,
});

export type Business = typeof business.$inferSelect;
export type NewBusiness = typeof business.$inferInsert;
