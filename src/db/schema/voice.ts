import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "../utils";

const genderEnum = ["male", "female"] as const;

export const voice = pgTable("voice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  language: text("language").default("english"),
  gender: text("gender", {
    enum: genderEnum,
  }).default("male"),
  provider: text("provider").notNull(),
  createdVoiceId: text("created_voice_id").notNull(),
});

export type Voice = typeof voice.$inferSelect;
export type NewVoice = typeof voice.$inferInsert;
