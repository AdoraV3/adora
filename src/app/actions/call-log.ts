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

export const createCalendarAvailabilityToolAction = authenticationProcedure
  .createServerAction()
  .input(appointmentSchema)
  .handler(async ({ input, ctx }) => {
    const { url, scenarioId } = input;

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
        name: `check_availability_for_${business?.name}`,
        strict: true,
        description: "Check calender availability for the caller",
        parameters: {
          type: "object",
          required: ["email", "name", "time", "timezone", "date"],
          properties: {
            email: {
              type: "string",
              description: "Email address of the caller",
            },
            date: {
              type: "string",
              description:
                "Date of the appointment. Date is in YYYY-MM-DD format e.g 2025-01-01",
            },
            time: {
              type: "string",
              description:
                "Time of the appointment. Time is in HH:MM format in 12-hour format e.g 09:00 AM, 01:30PM",
            },
            timezone: {
              type: "string",
              description: "Timezone of the caller e.g UTC",
            },
            name: {
              type: "string",
              description: "Name of the caller",
            },
          },
        },
      },
      server: {
        url,
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

export const createAppointmentBookingToolAction = authenticationProcedure
  .createServerAction()
  .input(appointmentSchema)
  .handler(async ({ input, ctx }) => {
    const { url: webhookUrl, scenarioId } = input;

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
        name: `book_appointments_for_${business?.name}`,
        strict: true,
        description: "Book the appointment for the caller",
        parameters: {
          type: "object",
          required: ["email", "name", "time", "timezone", "date"],
          properties: {
            email: {
              type: "string",
              description: "Email address of the caller",
            },
            date: {
              type: "string",
              description:
                "Date of the appointment. Date is in YYYY-MM-DD format e.g 2025-01-01",
            },
            time: {
              type: "string",
              description:
                "Time of the appointment. Time is in HH:MM format in 12-hour format e.g 09:00 AM, 01:30PM",
            },
            timezone: {
              type: "string",
              description: "Timezone of the caller e.g UTC",
            },
            name: {
              type: "string",
              description: "Name of the caller",
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
