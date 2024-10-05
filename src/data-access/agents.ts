import { db } from "@/db";
import { Agent, NewAgent, agent, availablePhoneNumber } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createAgent(data: NewAgent, trx = db) {
  return trx
    .insert(agent)
    .values({
      ...data,
    })
    .returning({ agentId: agent.id });
  // .onConflictDoNothing();
}

export async function getAgent(agentId: Agent["id"]) {
  return db.query.agent.findFirst({
    where: eq(agent.id, agentId),
  });
}

export async function updateAgent(agentId: Agent["id"], data: Partial<Agent>) {
  return db.update(agent).set(data).where(eq(agent.id, agentId));
}
export async function getAgents() {
  return db.query.agent.findMany();
}

export async function getAgentPhoneNumber(phoneNumberId: Agent["id"]) {
  return db.query.availablePhoneNumber.findFirst({
    where: eq(availablePhoneNumber.id, phoneNumberId),
  });
}
