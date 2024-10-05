import { createId } from "@paralleldrive/cuid2";
import { boolean, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";

export const availablePhoneNumber = pgTable("available_phone_numbers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  phoneNumber: varchar("phone_number", { length: 50 }).notNull(),
  isAssigned: boolean("is_assigned").notNull().default(false),
  dateAssigned: timestamp("date_assigned", { mode: "string" }),
  vapiId: text("vapi_id").notNull(),
  ...lifecycleDates,
});

export type AvailablePhoneNumber = typeof availablePhoneNumber.$inferSelect;
export type NewAvailablePhoneNumber = typeof availablePhoneNumber.$inferInsert;
