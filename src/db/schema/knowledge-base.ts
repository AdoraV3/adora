import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { business } from "./business";

export const knowledgeBase = pgTable("knowledge_base", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  transcript: text("transcript"),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  ...lifecycleDates,
});
