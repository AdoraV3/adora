"use server";

import { getCategories } from "@/data-access/systemPrompt";
import { createServerAction } from "zsa";

export const getCategoriesAction = createServerAction().handler(async () => {
  const prompts = await getCategories();
  return { success: true, data: prompts };
});
