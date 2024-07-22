import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { business } from "./business";

export const languageEnum = ["french", "english"] as const;
export const voiceEnum = ["male", "female"] as const;

export const agent = pgTable("agent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  language: text("language", { enum: languageEnum })
    .notNull()
    .default("english"),
  voice: text("voice", {
    enum: voiceEnum,
  })
    .notNull()
    .default("female"),
  telephone: text("telephone").notNull(),
  ...lifecycleDates,
});

// export const agentRelations = relations(agent, ({ one }) => ({
//   business: one(business, {
//     fields: [agent.businessId],
//     references: [business.id],
//   }),
// }));

export type Agent = typeof agent.$inferSelect;
export type NewAgent = typeof agent.$inferInsert;
