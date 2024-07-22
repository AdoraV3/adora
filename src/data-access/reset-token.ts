import { TOKEN_TTL } from "@/app/actions/constant";
import { db } from "@/db";
import { User, resetToken, user } from "@/db/schema";
import { generateOTP } from "@/db/utils";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export async function createPasswordResetToken(userId: User["id"]) {
  const token = generateOTP();
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db.delete(resetToken).where(eq(resetToken.userId, userId));
  await db.insert(resetToken).values({
    userId,
    token,
    tokenExpiresAt,
  });

  return token;
}

export async function getPasswordResetToken(token: string) {
  return db.query.resetToken.findFirst({
    where: eq(resetToken.token, token),
  });
}

export async function deletePasswordResetToken(token: string, trx = db) {
  await trx.delete(resetToken).where(eq(resetToken.token, token));
}

export async function verifyResetToken(token: string) {
  const tokenEntry = await getPasswordResetToken(token);
  if (!tokenEntry) {
    throw new ZSAError("NOT_FOUND");
  }
  const { userId } = tokenEntry;
  await db.update(user).set({ emailVerified: true }).where(eq(user.id, userId));
  await deletePasswordResetToken(token);
  return { user: userId, success: true };
}
