import { createId } from "@paralleldrive/cuid2";
import { boolean, text, varchar } from "drizzle-orm/pg-core";
import { lifecycleDates, pgTable } from "../utils";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }),
  emailVerified: boolean("email_verified").default(false),
  ...lifecycleDates,
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
