import { createId } from "@paralleldrive/cuid2";
import { text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "../utils";

export const languageEnum = ["french", "english"] as const;
export const voiceEnum = ["male", "female"] as const;

export const agent = pgTable("agent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  language: text("language", { enum: languageEnum })
    .notNull()
    .default("english"),
  voice: text("voice", {
    enum: voiceEnum,
  })
    .notNull()
    .default("female"),
  telephone: text("telephone").unique(),
  name: varchar("name", { length: 50 }),
  assistantId: varchar("assistant_id", { length: 50 }),
});

export type Agent = typeof agent.$inferSelect;
export type NewAgent = typeof agent.$inferInsert;
