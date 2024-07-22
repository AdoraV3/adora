import { db } from "@/db";
import { Business, NewBusiness, User, business } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createBusinessProfile(data: NewBusiness) {
  await db
    .insert(business)
    .values({
      ...data,
    })
    .onConflictDoNothing();
}

export async function updateBusinessProfile(
  userId: User["id"],
  data: Partial<Business>,
) {
  await db.update(business).set(data).where(eq(business.userId, userId));
}

export async function getBusinessProfile(userId: User["id"]) {
  return db.query.business.findFirst({
    where: eq(business.userId, userId),
  });
}
