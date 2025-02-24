import { z } from "zod";

export const webhookFormSchema = z.object({
  url: z.string().url(),
  scenarioId: z.string().min(1),
});

export type WebhookFormSchemaType = z.infer<typeof webhookFormSchema>;
