import {
  INVALID_EMAIL,
  INVALID_PHONE,
  MAX_PHONE_NUMBER_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  phoneRegExp,
} from "@/modules/commons/utils/constant";
import z from "zod";

export const profileSchema = z.object({
  firstName: z.string().email({
    message: INVALID_EMAIL,
  }),
  lastName: z.string().email({
    message: INVALID_EMAIL,
  }),
  BusinessName: z.string().email({
    message: INVALID_EMAIL,
  }),
  country: z.string().email({
    message: INVALID_EMAIL,
  }),
  phoneNumber: z
    .string()
    .regex(phoneRegExp, INVALID_PHONE)
    .min(13, MIN_PHONE_NUMBER_LENGTH)
    .max(13, MAX_PHONE_NUMBER_LENGTH),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
