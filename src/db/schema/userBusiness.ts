import { text, unique } from "drizzle-orm/pg-core";
import { pgTable } from "../utils";
import { business } from "./business";
import { user } from "./user";

export const userBusiness = pgTable(
  "user_business",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => business.id, { onDelete: "cascade" }),
  },
  table => ({
    pk: unique().on(table.userId, table.businessId),
  }),
);
