import * as schema from "@/db/schema";
import { db } from "..";
import systemPrompts from "./data/systemPrompts.json";

export async function systemPrompt() {
  await Promise.all(
    (systemPrompts as schema.SystemPrompt[]).map(async el => {
      return db
        .insert(schema.systemPrompt)
        .values({
          ...el,
        })
        .returning();
    }),
  );
}
