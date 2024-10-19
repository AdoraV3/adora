"use server";

import { getVoices } from "@/data-access/voices";
import { createServerAction } from "zsa";

export const getVoicesAction = createServerAction().handler(async () => {
  const voices = await getVoices();
  return { success: true, data: voices ?? [] };
});
