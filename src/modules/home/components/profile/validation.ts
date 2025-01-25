import {
  INVALID_PHONE,
  REQUIRED_FIELD,
  phoneRegExp,
} from "@/modules/commons/utils/constant";
import { businessRegistrationSchema } from "@/validations/business";
import z from "zod";

export const profileSchema = businessRegistrationSchema.extend({
  name: z.string().min(1, REQUIRED_FIELD).max(50),
  businessName: z.string().min(1, REQUIRED_FIELD).max(50),
  country: z.string().min(1, REQUIRED_FIELD).max(50),
  businessCountry: z.string().min(1, REQUIRED_FIELD).max(50),

  phoneNumber: z.string().regex(phoneRegExp, INVALID_PHONE),
  // .min(13, MIN_PHONE_NUMBER_LENGTH)
  // .max(15, MAX_PHONE_NUMBER_LENGTH),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
