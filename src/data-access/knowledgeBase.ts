import { db } from "@/db";
import {
  Business,
  KnowledgeBase,
  NewKnowledgeBase,
  knowledgeBase,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteKnowledgeBase(
  businessId: KnowledgeBase["businessId"],
  trx = db,
) {
  return trx
    .delete(knowledgeBase)
    .where(eq(knowledgeBase.businessId, businessId));
}

export async function createKnowledgeBase(data: NewKnowledgeBase) {
  return db
    .insert(knowledgeBase)
    .values({
      ...data,
    })
    .onConflictDoNothing()
    .returning({ businessId: knowledgeBase.businessId });
}

export async function getKnowledgeBase(businessId: KnowledgeBase["id"]) {
  return db.query.knowledgeBase.findFirst({
    where: eq(knowledgeBase.businessId, businessId),
  });
}

export async function updateKnowledgeBase(
  businessId: Business["id"],
  data: Partial<KnowledgeBase>,
) {
  return db
    .update(knowledgeBase)
    .set(data)
    .where(eq(knowledgeBase.businessId, businessId));
}
