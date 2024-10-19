/* eslint-disable sonarjs/no-duplicate-string */

"use server";

import { getBusiness } from "@/data-access";
import { getAgent, getAgentPhoneNumber } from "@/data-access/agents";
import { db } from "@/db";
import { agent } from "@/db/schema";
import { authenticationProcedure } from "@/lib/procedures";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { ZSAError } from "zsa";

export const getAgentPhoneNumberAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business || !business.agentId) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }
    const findAgent = await getAgent(business.agentId);

    if (!findAgent) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    const phoneNumber = await getAgentPhoneNumber(findAgent.phoneNumberId);
    return { success: true, data: phoneNumber };
  });

export const getAgentAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business || !business.agentId) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const agentDetails = await getAgent(business.agentId);

    if (!agentDetails) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    return { success: true, data: agentDetails };
  });

export const getAgentDetailsAction = authenticationProcedure
  .createServerAction()
  .input(z.object({ agentId: z.string().optional() }))
  .handler(async ({ input }) => {
    const { agentId } = input;
    if (!agentId) {
      throw new ZSAError("NOT_FOUND", "Agent ID is required.");
    }

    const returnedAgent = await db.query.agent.findFirst({
      where: eq(agent.assistantId, agentId),
    });
    if (!agent) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    return { success: true, data: returnedAgent };
  });

// export const createPhoneNumberAction = authenticationProcedure
//   .createServerAction()
//   .input(phoneNumberImportSchema)
//   .handler(async ({ ctx, input }) => {
//     const { id } = ctx;
//     const { phoneNumber, accountSID, authToken } = input;
//     const business = await getBusiness(id);
//     if (!business) {
//       throw new ZSAError("NOT_FOUND", "Business not found.");
//     }
//     const agent = await getAgent(business?.agentId);

//     if (!agent || !agent.assistantId) {
//       throw new ZSAError("NOT_FOUND", "Agent not found.");
//     }
//     const payload = {
//       // fallbackDestination: {
//       //   // assistantId: agent.assistantId,
//       //   type: "assistant",
//       //   assistName: agent.name,
//       // },
//       provider: "twilio",
//       number: phoneNumber.replace(/\s+/g, ""),
//       twilioAccountSid: accountSID,
//       twilioAuthToken: authToken,
//       name: business.name,
//       assistantId: agent.assistantId,
//     };
//     await createVapiPhoneNumber(payload);
//     return { success: true, data: agent };
//   });
