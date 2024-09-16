"use server";

import { getBusiness } from "@/data-access";
import { getAgent, updateAgent } from "@/data-access/agents";
import { authenticationProcedure } from "@/lib/procedures";
import { phoneNumberImportSchema } from "@/modules/home/components/phone-number/schema";
import { ZSAError } from "zsa";
import { createVapiPhoneNumber } from "./vapi";

export const getAgentAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }
    const agent = await getAgent(business?.id);

    if (!agent) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }
    return { success: true, data: agent };
  });

export const createPhoneNumberAction = authenticationProcedure
  .createServerAction()
  .input(phoneNumberImportSchema)
  .handler(async ({ ctx, input }) => {
    const { id } = ctx;
    const { phoneNumber, accountSID, authToken } = input;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }
    const agent = await getAgent(business?.agentId);

    if (!agent || !agent.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }
    const payload = {
      // fallbackDestination: {
      //   // assistantId: agent.assistantId,
      //   type: "assistant",
      //   assistName: agent.name,
      // },
      provider: "twilio",
      number: phoneNumber.replace(/\s+/g, ""),
      twilioAccountSid: accountSID,
      twilioAuthToken: authToken,
      name: business.name,
      assistantId: agent.assistantId,
    };
    const vapiResponse = await createVapiPhoneNumber(payload);
    await updateAgent(agent.id, { telephone: vapiResponse.phoneNumber });
    return { success: true, data: agent };
  });
