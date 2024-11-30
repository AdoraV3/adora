import { db } from "@/db";
import { SystemPrompt, systemPrompt } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCategory(categoryId: SystemPrompt["id"]) {
  return db.query.systemPrompt.findFirst({
    where: eq(systemPrompt.id, categoryId),
  });
}

export async function getCategories() {
  return db.query.systemPrompt.findMany();
}
