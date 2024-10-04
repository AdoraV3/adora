import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "../utils";

export const systemPrompt = pgTable("system_prompt", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  label: text("label"),
  value: text("value"),
  systemPrompt: text("system_prompt"),
});

export type SystemPrompt = typeof systemPrompt.$inferSelect;
export type NewSystemPrompt = typeof systemPrompt.$inferInsert;
