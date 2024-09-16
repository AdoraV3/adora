import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import { z } from "zod";
import { INVALID_PHONE, REQUIRED_FIELD } from "../commons/utils/constant";

export const contactUsSchema = z.object({
  fullName: z.string().min(3, REQUIRED_FIELD),
  businessName: z.string().min(3, REQUIRED_FIELD),
  email: z.string().email(),
  message: z.string().min(3, REQUIRED_FIELD),
  phoneNumber: z.string().refine(value => {
    if (!isPossiblePhoneNumber(value)) {
      return false;
    }

    if (!isValidPhoneNumber(value)) {
      return false;
    }

    const phoneNumber = parsePhoneNumber(value);
    if (!phoneNumber) return false;

    // Check if the number of digits is appropriate for the country
    const minLength = phoneNumber.countryCallingCode === "1" ? 10 : 8;
    return phoneNumber.nationalNumber.length >= minLength;
  }, INVALID_PHONE),
});

export type ContactUsSchemaType = z.infer<typeof contactUsSchema>;
