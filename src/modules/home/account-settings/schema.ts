import { z } from "zod";

export const accountPreferenceSchema = z.object({
  country: z.string().min(1, "Country is required."),
  timezone: z.string().min(1, "Timezone is required."),
});

export type AccountPreferenceSchemaType = z.infer<
  typeof accountPreferenceSchema
>;

export const agentDetailsSchema = z.object({
  number: z.string().min(1, "Agent Number is required."),
  voice: z.string().min(1, "Agent Voice is required."),
  name: z.string().min(1, "Agent Name is required."),
});

export type AgentDetailsSchemaType = z.infer<typeof agentDetailsSchema>;
