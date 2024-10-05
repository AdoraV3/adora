import { TOKEN_TTL } from "@/app/actions/constant";
import { db } from "@/db";
import {
  NewAccount,
  NewUser,
  User,
  account,
  resetToken,
  session,
  user,
  verifyEmailToken,
} from "@/db/schema";
import { generateOTP } from "@/db/utils";
import { and, eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { cache } from "react";
import { ZSAError } from "zsa";

export async function createAccount(data: NewAccount, trx = db) {
  return trx
    .insert(account)
    .values({
      ...data,
    })
    .onConflictDoNothing();
}

export const getUserByEmail = cache(async (email: string) => {
  return db.query.user.findFirst({
    where: eq(user.email, email),
    with: {
      profile: { columns: { userId: false } },
      account: { columns: { userId: false, password: false } },
      accountPreferences: { columns: { userId: false } },
    },
  });
});

export async function getPasswordResetToken(token: string) {
  return db.query.resetToken.findFirst({
    where: eq(resetToken.token, token),
  });
}

export async function deletePasswordResetToken(token: string, trx = db) {
  return trx.delete(resetToken).where(eq(resetToken.token, token));
}

export async function updatePassword(
  userId: User["id"],
  password: string,
  trx = db,
) {
  const passwordHash = await new Argon2id().hash(password);
  return trx
    .update(account)
    .set({
      password: passwordHash,
    })
    .where(and(eq(account?.userId, userId), eq(account?.type, "email")));
}

export async function getVerifyEmailToken(token: string) {
  return db.query.verifyEmailToken.findFirst({
    where: eq(verifyEmailToken.token, token),
  });
}

export async function deleteVerifyEmailToken(token: string) {
  return db.delete(verifyEmailToken).where(eq(verifyEmailToken.token, token));
}

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

export const createVerifyEmailToken = async (userId: string, trx = db) => {
  const token = generateOTP();
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await trx
    .insert(verifyEmailToken)
    .values({
      userId,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: verifyEmailToken.id,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
};

export async function verifyEmail(token: string) {
  const tokenEntry = await getVerifyEmailToken(token);
  if (!tokenEntry) {
    throw new ZSAError("NOT_FOUND", "Invalid  OTP");
  }
  const { userId } = tokenEntry;
  await db.update(user).set({ emailVerified: true }).where(eq(user.id, userId));
  await deleteVerifyEmailToken(token);
  return { user: userId, success: true };
}

export async function deleteSessionForUser(userId: User["id"]) {
  return db.delete(session).where(eq(session.userId, userId));
}

export async function verifyResetPasswordEmail(token: string) {
  const tokenEntry = await getPasswordResetToken(token);
  if (!tokenEntry) {
    throw new ZSAError("NOT_FOUND", "Invalid  OTP");
  }
  const { userId } = tokenEntry;
  await db.update(user).set({ emailVerified: true }).where(eq(user.id, userId));
  await deletePasswordResetToken(token);
  return { user: userId, success: true };
}

export async function createAccountViaGoogle(
  userId: User["id"],
  googleId: string,
) {
  await db
    .insert(account)
    .values({
      userId,
      type: "google",
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function updateUser(
  userId: User["id"],
  updatedUser: Partial<User>,
) {
  return db.update(user).set(updatedUser).where(eq(user.id, userId));
}

export async function createUser(data: NewUser, trx = db) {
  return trx
    .insert(user)
    .values({
      ...data,
    })
    .onConflictDoNothing()
    .returning({ userId: user.id });
}

export const getSubscriberByEmail = async (email: string) => {
  return db.query.user.findFirst({
    where: eq(user.email, email),
  });
};
