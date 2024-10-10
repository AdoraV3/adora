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
