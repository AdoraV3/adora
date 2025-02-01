import { REQUIRED_FIELD } from "@/modules/commons/utils/constant";
import { businessRegistrationSchema } from "@/validations/business";
import z from "zod";

export const profileSchema = businessRegistrationSchema.extend({
  name: z.string().min(1, REQUIRED_FIELD).max(50),
  businessName: z.string().min(1, REQUIRED_FIELD).max(50),
  country: z.string().min(1, REQUIRED_FIELD).max(50),
  businessCountry: z.string().min(1, REQUIRED_FIELD).max(50),
  phoneNumber: z.string().min(5, REQUIRED_FIELD).max(50),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
