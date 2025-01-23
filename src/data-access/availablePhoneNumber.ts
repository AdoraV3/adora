import { db } from "@/db";
import {
  AvailablePhoneNumber,
  NewAvailablePhoneNumber,
  availablePhoneNumber,
} from "@/db/schema";
import { VapiClient } from "@vapi-ai/server-sdk";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { ZSAError } from "zsa";
import { getBusiness, updateBusiness } from ".";
import { getAgent } from "./agents";

export async function getAvailablePhoneNumbers() {
  return db.query.availablePhoneNumber.findMany({
    where: eq(availablePhoneNumber.isAssigned, false),
  });
}

export async function createAvailablePhoneNumber(
  data: NewAvailablePhoneNumber[],
) {
  return db.insert(availablePhoneNumber).values(data).returning();
}

export async function getPhoneNumbers() {
  return db.query.availablePhoneNumber.findMany();
}

export async function updatePhoneNumber(
  id: AvailablePhoneNumber["id"],
  data: Partial<AvailablePhoneNumber>,
  trx = db,
) {
  return trx
    .update(availablePhoneNumber)
    .set(data)
    .where(eq(availablePhoneNumber.id, id));
}

export async function getPhoneNumber(phoneNumberId: string) {
  return db.query.availablePhoneNumber.findFirst({
    where: eq(availablePhoneNumber.id, phoneNumberId),
  });
}

export async function unAssignPhoneNumber(businessId: string) {
  const business = await getBusiness(businessId);
  if (!business) {
    throw new ZSAError("NOT_FOUND", "Business not found.");
  }

  const agent = await getAgent(business?.agentId);
  if (!agent?.phoneNumberId) {
    throw new ZSAError("NOT_FOUND", "Agent not found.");
  }

  const phoneNumber = await getPhoneNumber(agent?.phoneNumberId);
  if (!phoneNumber?.vapiId) {
    throw new ZSAError("NOT_FOUND", "Phone number not found.");
  }
  await updatePhoneNumber(phoneNumber?.vapiId, {
    isAssigned: false,
  });

  await updateBusiness(businessId, {
    agentId: undefined,
  });

  const client = new VapiClient({ token: env.VAPI_API_KEY });

  await client.phoneNumbers.update(phoneNumber?.vapiId, {
    assistantId: undefined,
  });
}
