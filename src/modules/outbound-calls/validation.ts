import {
  INVALID_PHONE,
  MAX_PHONE_NUMBER_LENGTH,
  MIN_PHONE_NUMBER_LENGTH,
  REQUIRED_FIELD,
  phoneRegExp,
} from "@/modules/commons/utils/constant";
import z from "zod";

export const createOutboundCallSchema = z.object({
  startTime: z.date({
    required_error: REQUIRED_FIELD,
  }),
  endTime: z.date({
    required_error: REQUIRED_FIELD,
  }),
  date: z.date({
    required_error: REQUIRED_FIELD,
  }),
  callCycle: z.string().min(1, REQUIRED_FIELD).max(50),
  knowledgeBase: z.string().min(1, REQUIRED_FIELD).max(50),

  phoneNumber: z
    .string()
    .regex(phoneRegExp, INVALID_PHONE)
    .min(13, MIN_PHONE_NUMBER_LENGTH)
    .max(13, MAX_PHONE_NUMBER_LENGTH),
});

export type CreateOutboundCallSchemaType = z.infer<
  typeof createOutboundCallSchema
>;

export const paymentMethodSchema = z.object({
  type: z.enum(["paystack", "stripe", "none"], {
    required_error: "You need to select a payment method",
  }),
});

export type PaymentMethodSchemaType = z.infer<typeof paymentMethodSchema>;
