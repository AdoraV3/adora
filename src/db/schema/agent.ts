import { createId } from "@paralleldrive/cuid2";
import { text, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { availablePhoneNumber } from "./availablePhoneNumber";
import { systemPrompt } from "./systemPrompt";
import { voice } from "./voice";

export const languageEnum = ["french", "english"] as const;
export const voiceEnum = ["male", "female"] as const;

export const agent = pgTable("agent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  language: text("language", { enum: languageEnum })
    .notNull()
    .default("english"),
  voiceId: text("voice_id")
    .notNull()
    .references(() => voice.id, {
      onDelete: "cascade",
    }),
  provider: varchar("provider", { length: 200 }),
  name: varchar("name", { length: 50 }),
  assistantId: varchar("assistant_id", { length: 50 }),
  phoneNumberId: text("phone_number_id")
    .notNull()
    .references(() => availablePhoneNumber.id, {
      onDelete: "cascade",
    }),
  categoryId: text("category_id")
    .notNull()
    .references(() => systemPrompt.id, {
      onDelete: "cascade",
    }),
  ...lifecycleDates,
});

export type Agent = typeof agent.$inferSelect;
export type NewAgent = typeof agent.$inferInsert;
