import { db } from "@/db";
import { Business, NewBusiness, User, business } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createBusiness(data: NewBusiness, trx = db) {
  return trx
    .insert(business)
    .values({
      ...data,
    })
    .onConflictDoNothing()
    .returning({ businessId: business.userId });
}

export async function updateBusiness(
  userId: User["id"],
  data: Partial<Business>,
) {
  return db.update(business).set(data).where(eq(business.userId, userId));
}

export async function getBusiness(userId: User["id"]) {
  return db.query.business.findFirst({
    where: eq(business.userId, userId),
    // with: { subscription: true },
  });
}
