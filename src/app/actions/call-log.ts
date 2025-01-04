"use server";

import { getBusiness } from "@/data-access";
import { getAgent } from "@/data-access/agents";
import { authenticationProcedure } from "@/lib/procedures";
import {
  appointmentSchema,
  callLogSchema,
  callLogsSchema,
} from "@/modules/call-logs/validation";
import { VapiClient } from "@vapi-ai/server-sdk";
import { env } from "env.mjs";
import { ZSAError } from "zsa";
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

export const createCallLogAction = authenticationProcedure
  .createServerAction()
  .input(appointmentSchema)
  .handler(async ({ input, ctx }) => {
    const { webhookUrl, scenarioId } = input;

    const { id } = ctx;

    const business = await getBusiness(id);
    if (!business?.agentId) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const existingAgent = await getAgent(business.agentId);

    if (!existingAgent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    const client = new VapiClient({ token: env.VAPI_API_KEY });
    const createToolResponse = await client.tools.create({
      type: "make",
      metadata: {
        scenarioId: scenarioId as number,
      },
      function: {
        name: "sendAppointmentLink",
        strict: true,
        description: "Send appointment link to the user",
        parameters: {
          type: "object",
          required: ["email", "meetingLink"],
          properties: {
            email: {
              type: "string",
              description: "Email address of the caller",
            },
            meetingLink: {
              type: "string",
              description: "Meeting link for the appointment",
            },
          },
        },
      },
      server: {
        url: webhookUrl,
      },
    });

    client.assistants.update(existingAgent?.assistantId, {
      model: {
        toolIds: [createToolResponse.id],
        provider: "openai",
        model: "gpt-3.5-turbo",
      },
    });
  });
