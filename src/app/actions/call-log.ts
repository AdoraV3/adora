"use server";

import { authenticationProcedure } from "@/lib/procedures";
import { callLogSchema, callLogsSchema } from "@/modules/call-logs/validation";
import { getVapiCall, getVapiCalls } from "./vapi/calls";

export const getCallsAction = authenticationProcedure
  .createServerAction()
  .input(callLogsSchema)
  .handler(async ({ input }) => {
    const { limit, createdAtGe, createdAtLe, assistantId } = input;
    const callLogs = await getVapiCalls({
      assistantId,
      limit,
      createdAtGe,
      createdAtLe,
    });
    return { success: true, data: callLogs };
  });

export const getCallAction = authenticationProcedure
  .createServerAction()
  .input(callLogSchema)
  .handler(async ({ input }) => {
    const { callId } = input;
    const callLogs = await getVapiCall(callId);
    return { success: true, data: callLogs };
  });
