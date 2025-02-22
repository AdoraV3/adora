/* eslint-disable sonarjs/no-duplicate-string */

"use server";

import { getBusiness, getUserByEmail } from "@/data-access";
import { getAgent, getAgentPhoneNumber } from "@/data-access/agents";
import { db } from "@/db";
import { agent } from "@/db/schema";
import { authenticationProcedure } from "@/lib/procedures";
import { agentDetailsSchema } from "@/modules/home/account-settings/schema";
import { VapiClient } from "@vapi-ai/server-sdk";
import { eq } from "drizzle-orm";
import { env } from "env.mjs";
import { z } from "zod";
import { ZSAError } from "zsa";

export const getAgentPhoneNumberAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business?.agentId) {
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
    if (!business?.agentId) {
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

export const getAgentWithVoiceAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business?.agentId) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const agentDetails = await db.query.agent.findFirst({
      where: eq(agent.id, business.agentId),
      with: {
        voice: true,
        phoneNumber: true,
      },
    });

    if (!agentDetails) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    return { success: true, data: agentDetails };
  });

export const getProfileAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id, email } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      throw new ZSAError("NOT_FOUND", "User not found");
    }

    const existingAgent = await db.query.agent.findFirst({
      where: eq(agent?.id, business?.agentId),
      with: {
        phoneNumber: true,
      },
    });

    if (!existingAgent) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }

    const profile = {
      businessCountry: business?.country,
      businessName: business?.name,
      country: user?.profile?.country,
      phoneNumber: existingAgent?.phoneNumber?.phoneNumber,
      name: user?.profile?.name,
      agentName: existingAgent?.name,
      category: existingAgent?.categoryId,
      businessPhoneNumber: user?.profile?.phone,
      voice: existingAgent?.voiceId,
      isProfileCompleted: business?.isProfileCompleted,
    };

    return {
      success: true,
      profile,
    };
  });

export const updateAssistantAction = authenticationProcedure
  .createServerAction()
  .input(agentDetailsSchema)
  .handler(async ({ input, ctx }) => {
    const { name, voice } = input;
    const { id } = ctx;

    const business = await getBusiness(id);
    if (!business?.agentId) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const findAgent = await db.query.agent.findFirst({
      where: eq(agent.id, business.agentId),
      with: {
        voice: true,
      },
    });

    if (!findAgent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found.");
    }

    await db
      .update(agent)
      .set({
        name,
        voiceId: voice,
      })
      .where(eq(agent.id, business.agentId));

    const client = new VapiClient({ token: env.VAPI_API_KEY });
    await client.assistants.update(findAgent.assistantId, {
      name,
      firstMessage: `Hello, Thank you for calling ${business?.name}. My name is ${name} How may I help you today?`,
    });
  });
