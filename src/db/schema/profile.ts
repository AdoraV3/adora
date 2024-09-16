import { createId } from "@paralleldrive/cuid2";
import { text, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";
import { user } from "./user";

export const profile = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  phone: varchar("phone"),
  country: varchar("country"),
  ...lifecycleDates,
});

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
