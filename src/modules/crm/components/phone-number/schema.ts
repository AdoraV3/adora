import { INVALID_PHONE, phoneRegExp } from "@/modules/commons/utils/constant";
import { z } from "zod";

export const phoneNumberImportSchema = z.object({
  phoneNumber: z.string().regex(phoneRegExp, INVALID_PHONE),
  accountSID: z.string().min(1).max(50),
  authToken: z.string().min(1).max(50),
});

export type PhoneNumberImportSchemaType = z.infer<
  typeof phoneNumberImportSchema
>;
