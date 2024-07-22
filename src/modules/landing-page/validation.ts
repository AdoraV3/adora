import { z } from "zod";
import {
  INVALID_PHONE,
  MAX_PHONE_NUMBER_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  REQUIRED_FIELD,
  phoneRegExp,
} from "../commons/utils/constant";

export const contactUsSchema = z.object({
  fullName: z.string().min(3, REQUIRED_FIELD),
  businessName: z.string().min(3, REQUIRED_FIELD),
  email: z.string().email(),
  message: z.string().min(3, REQUIRED_FIELD),
  phoneNumber: z
    .string()
    .regex(phoneRegExp, INVALID_PHONE)
    .min(13, MIN_PHONE_NUMBER_LENGTH)
    .max(13, MAX_PHONE_NUMBER_LENGTH),
});

export type ContactUsSchemaType = z.infer<typeof contactUsSchema>;
