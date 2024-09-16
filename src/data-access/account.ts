import { db } from "@/db";
import { User, account } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAccount(userId: User["id"]) {
  return db.query.account.findFirst({
    where: eq(account.userId, userId),
    with: {},
  });
}
