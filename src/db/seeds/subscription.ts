import * as schema from "@/db/schema";
import { db } from "..";
import subscriptions from "./data/subscriptions.json";

export async function subscription() {
  await Promise.all(
    (subscriptions as schema.Subscription[]).map(async el => {
      return db
        .insert(schema.subscription)
        .values({
          ...el,
        })
        .returning();
    }),
  );
}
