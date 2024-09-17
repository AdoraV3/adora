import { createId } from "@paralleldrive/cuid2";
import { text, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { business } from "./business";

export const callLog = pgTable("call_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  agentName: varchar("agent_name", { length: 255 }),
  transcript: text("transcript"),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  ...lifecycleDates,
});
