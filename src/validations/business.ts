import { z } from "zod";

export const businessRegistrationSchema = z.object({
  businessName: z
    .string()
    .min(3, {
      message: "Business name must be at least 3 characters long",
    })
    .max(100),

  category: z.string(),
  agentName: z
    .string()
    .min(3, {
      message: "Agent name must be at least 3 characters long",
    })
    .max(100),
  voice: z.string(),
  businessPhoneNumber: z.string(),
});
