import {
  INVALID_FIRST_NAME,
  INVALID_LAST_NAME,
  INVALID_PHONE,
  MAX_PHONE_NUMBER_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  REQUIRED_FIELD,
  phoneRegExp,
} from "@/modules/commons/utils/constant";
import z from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, INVALID_FIRST_NAME).max(50),
  lastName: z.string().min(1, INVALID_LAST_NAME).max(50),
  businessName: z.string().min(1, REQUIRED_FIELD).max(50),
  country: z.string().min(1, REQUIRED_FIELD).max(50),
  businessCountry: z.string().min(1, REQUIRED_FIELD).max(50),

  phoneNumber: z
    .string()
    .regex(phoneRegExp, INVALID_PHONE)
    .min(13, MIN_PHONE_NUMBER_LENGTH)
    .max(13, MAX_PHONE_NUMBER_LENGTH),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
