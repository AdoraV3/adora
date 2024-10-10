import { db } from "@/db";
import {
  AvailablePhoneNumber,
  NewAvailablePhoneNumber,
  availablePhoneNumber,
} from "@/db/schema";
import { eq } from "drizzle-orm";

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
