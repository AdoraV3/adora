import { z } from "zod";

export const webhookFormSchema = z.object({
  url: z.string().url(),
});

export type WebhookFormSchemaType = z.infer<typeof webhookFormSchema>;
