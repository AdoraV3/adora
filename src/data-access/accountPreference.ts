import { db } from "@/db";
import {
  AccountPreference,
  NewAccountPreference,
  accountPreference,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAccountPreference(
  accountPreferenceId: AccountPreference["id"],
) {
  return db.query.accountPreference.findFirst({
    where: eq(accountPreference.id, accountPreferenceId),
  });
}

export async function createAccountPreference(
  data: NewAccountPreference,
  trx = db,
) {
  return trx
    .insert(accountPreference)
    .values({
      ...data,
    })
    .onConflictDoUpdate({
      target: [accountPreference.id],
      set: {
        ...data,
      },
    })
    .returning({ accountPreference: accountPreference.id });
}
