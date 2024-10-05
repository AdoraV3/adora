import { db } from "@/db";
import { NewProfile, Profile, User, profile } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createProfile(data: NewProfile, trx = db) {
  return trx
    .insert(profile)
    .values({
      ...data,
    })
    .onConflictDoNothing();
}

export async function updateProfile(
  userId: User["id"],
  data: Partial<Profile>,
) {
  return db.update(profile).set(data).where(eq(profile.userId, userId));
}

export async function getProfile(userId: User["id"]) {
  return db.query.profile.findFirst({
    where: eq(profile.userId, userId),
    with: {},
  });
}
