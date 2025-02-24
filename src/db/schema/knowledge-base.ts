import { createId } from "@paralleldrive/cuid2";
import { integer, text } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { business } from "./business";

export const knowledgeBase = pgTable("knowledge_base", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  url: text("url"),
  fileId: text("file_id"),
  size: integer("size"),
  originalName: text("original_name"),
  vapiKnowledgeBaseId: text("vapi_knowledge_base_id").notNull().default(""),
  vapiFileId: text("vapi_file_id").notNull().default(""),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  ...lifecycleDates,
});

export type KnowledgeBase = typeof knowledgeBase.$inferSelect;
export type NewKnowledgeBase = typeof knowledgeBase.$inferInsert;
