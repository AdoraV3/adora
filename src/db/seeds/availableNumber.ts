import * as schema from "@/db/schema";
import { db } from "..";
import availablePhoneNumbers from "./data/availablePhoneNumber.json";

export async function availablePhoneNumber() {
  await Promise.all(
    (availablePhoneNumbers as schema.AvailablePhoneNumber[]).map(async el => {
      return db
        .insert(schema.availablePhoneNumber)
        .values({
          ...el,
        })
        .returning();
    }),
  );
}
