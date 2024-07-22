import { z } from "zod";
import {
  INVALID_PHONE,
  MAX_PHONE_NUMBER_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  REQUIRED_FIELD,
  phoneRegExp,
} from "../commons/utils/constant";

export const createKnowledgeBaseSchema = z.object({
  companyName: z.string().min(3, REQUIRED_FIELD).max(100),
  contactPerson: z.string().min(3, REQUIRED_FIELD).max(20),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(phoneRegExp, INVALID_PHONE)
    .min(13, MIN_PHONE_NUMBER_LENGTH)
    .max(13, MAX_PHONE_NUMBER_LENGTH),
  website: z.string().url(),
  glossary: z.string().min(2, REQUIRED_FIELD),
  content: z.string().min(3, REQUIRED_FIELD),
  additionalInformation: z.string().max(100).optional(),
  customerDirectory: z.string().max(100).optional(),
  terms: z.string().max(100).optional(),
  knowledgeBase: z.string().min(1, REQUIRED_FIELD).max(50),
  category: z.array(z.object({ value: z.string(), label: z.string() })),
});

export type CreateKnowledgeBaseSchemaType = z.infer<
  typeof createKnowledgeBaseSchema
>;
