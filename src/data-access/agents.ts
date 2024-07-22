import { db } from "@/db";
import { NewAgent, agent } from "@/db/schema";

export async function createAgent(data: NewAgent) {
  await db
    .insert(agent)
    .values({
      ...data,
    })
    .onConflictDoNothing();
}
