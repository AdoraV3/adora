import * as schema from "@/db/schema";
import { db } from "..";
import voices from "./data/voices.json";

export async function voice() {
  await Promise.all(
    (voices as schema.Voice[]).map(async el => {
      return db
        .insert(schema.voice)
        .values({
          ...el,
        })
        .returning();
    }),
  );
}
