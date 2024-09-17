"use server";

import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
  getProfile,
  getUserByEmail,
  updatePassword,
} from "@/data-access";
import { sendResetPasswordEmail } from "@/emails";
import { createTransaction } from "@/lib/create-transaction";
import { authenticationProcedure } from "@/lib/procedures";
import { changePasswordSchema } from "@/validations/auth";
import { ZSAError } from "zsa";

export const changePasswordAction = authenticationProcedure
  .createServerAction()
  .input(changePasswordSchema)
  .handler(async ({ input }) => {
    const { token, password } = input;
    if (!token) {
      throw new ZSAError("NOT_FOUND", "Token is required");
    }
    const tokenEntry = await getPasswordResetToken(token);

    if (!tokenEntry) {
      throw new ZSAError("NOT_FOUND", "Token not found");
    }

    const { userId } = tokenEntry;

    await createTransaction(async trx => {
      await deletePasswordResetToken(token, trx);
      await updatePassword(userId, password, trx);
    });
  });

export async function resetPasswordAction(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ZSAError("NOT_FOUND", "User not found");
  }

  const profile = await getProfile(user?.id);

  if (!profile) {
    throw new ZSAError("NOT_FOUND", "Profile not found");
  }

  const token = await createPasswordResetToken(user.id);

  await sendResetPasswordEmail({
    token,
    to: "stemitope370@gmail.com",
    name: profile?.name,
  });
  return { success: true };
}

export const sendResetPasswordEmailAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    await resetPasswordAction(email);
  });
