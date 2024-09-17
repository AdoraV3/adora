import * as schema from "@/db/schema";
import { db } from "..";
import agents from "./data/agents.json";

export async function agent() {
  await Promise.all(
    (agents as schema.Agent[]).map(async el => {
      return db
        .insert(schema.agent)
        .values({
          ...el,
        })
        .returning();
    }),
  );
}
