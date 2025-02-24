import { z } from "zod";

export const callLogsSchema = z.object({
  assistantId: z.string(),
  limit: z.number().optional(),
  createdAtGe: z.string().optional(),
  createdAtLe: z.string().optional(),
});

export const callLogSchema = z.object({
  callId: z.string(),
});

export const appointmentSchema = z.object({
  url: z.string().url(),
  scenarioId: z.union([
    z.coerce
      .number({
        message: "This field must be a number",
      })
      .int({
        message: "This field must be a whole number",
      })
      .positive({
        message: "This field must be a positive number",
      }),
    z.literal("").refine(() => false, {
      message: "This field is required",
    }),
  ]),
});

export type AppointmentSchemaType = z.infer<typeof appointmentSchema>;
