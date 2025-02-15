"use server";

import {
  createBusiness,
  getBusiness,
  updateBusiness,
  updateProfile,
} from "@/data-access";
import { createAgent, getAgent, updateAgent } from "@/data-access/agents";
import { updatePhoneNumber } from "@/data-access/availablePhoneNumber";
import { getVoice } from "@/data-access/voices";
import { db } from "@/db";
import { availablePhoneNumber, subscription, systemPrompt } from "@/db/schema";
import { createTransaction } from "@/lib/create-transaction";
import { authenticationProcedure } from "@/lib/procedures";
import { formatDateToCustomFormat } from "@/modules/commons/utils/helpers";
import { profileSchema } from "@/modules/home/components/profile/validation";
import { VapiClient } from "@vapi-ai/server-sdk";
import { and, eq } from "drizzle-orm";
import { env } from "process";
import { ZSAError } from "zsa";
import { updateVapiPhoneNumber } from "./vapi";

export const getBusinessAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);

    return { success: true, data: business };
  });

export const createBusinessAction = authenticationProcedure
  .createServerAction()
  .input(profileSchema)
  .handler(async ({ ctx, input }) => {
    const {
      businessName,
      agentName,
      phoneNumber: phone,
      voice,
      category,
      country,
      businessPhoneNumber,
      businessCountry,
    } = input;
    const { id: userId } = ctx;

    const isPhoneNumberAvailable =
      await db.query.availablePhoneNumber.findFirst({
        where: and(
          eq(availablePhoneNumber.id, phone),
          eq(availablePhoneNumber.isAssigned, false),
        ),
      });

    if (!isPhoneNumberAvailable) {
      throw new ZSAError("NOT_AUTHORIZED", "Phone number not available");
    }

    const basicSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.plan, "basic"),
    });

    if (!basicSubscription?.priceId) {
      throw new ZSAError("NOT_FOUND", "Subscription not found");
    }
    const findVoice = await getVoice(voice);

    if (!findVoice) {
      throw new ZSAError("NOT_FOUND", "Selected voice not available");
    }

    const categoryResult = await db.query.systemPrompt.findFirst({
      where: eq(systemPrompt.id, category),
    });

    const client = new VapiClient({ token: env.VAPI_API_KEY });
    const newTool = await client.tools.create({
      type: "transferCall",
      destinations: [
        {
          type: "number",
          number: businessPhoneNumber,
          message:
            "I am forwarding your call to a live agent. Please stay on the line.",
        },
      ],
      function: {
        name: `transfer-call`,
        description: "Transfer call to the business",
        parameters: {
          type: "object",
          properties: {
            destination: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
            },
          },
          required: ["destination"],
        },
      },
    });

    const newAssistant = await client.assistants.create({
      model: {
        messages: [
          {
            role: "system",
            content: categoryResult?.systemPrompt as string,
          },
        ],
        model: "gpt-4",
        provider: "openai",
        toolIds: [newTool.id],
      },

      name: agentName,

      voice: {
        provider: "11labs",
        voiceId: findVoice?.createdVoiceId,
      },

      firstMessage: `Hello, Thank you for calling ${businessName}. My name is ${agentName} How may I help you today?`,
    });

    await updateVapiPhoneNumber(isPhoneNumberAvailable.vapiId, {
      assistantId: newAssistant?.id,
    });

    await createTransaction(async trx => {
      const [newAgent] = await createAgent(
        {
          assistantId: newAssistant.id,
          name: agentName,
          phoneNumberId: phone,
          voiceId: voice,
          provider: findVoice.provider,
          categoryId: category,
        },
        trx,
      );

      await updatePhoneNumber(
        phone,
        { isAssigned: true, dateAssigned: new Date()?.toISOString() },
        trx,
      );

      const endDate = new Date();
      const subscriptionEndDate = new Date(endDate);
      subscriptionEndDate.setDate(endDate.getDate() + 3);

      updateProfile(userId, {
        country,
        phone: businessPhoneNumber,
      });

      await createBusiness(
        {
          name: businessName,
          userId,
          subscriptionId: basicSubscription?.id,
          agentId: newAgent.agentId,
          subscriptionStartDate: formatDateToCustomFormat(new Date()),
          subscriptionEndDate: formatDateToCustomFormat(subscriptionEndDate),
          isFreeTrial: true,
          isProfileCompleted: true,
          country: businessCountry,
        },
        trx,
      );
    });
  });

export const updateBusinessAction = authenticationProcedure
  .createServerAction()
  .input(profileSchema)
  .handler(async ({ ctx, input }) => {
    const {
      businessName,
      agentName,
      businessPhoneNumber,
      voice,
      category,
      country,
      businessCountry,
      name,
    } = input;
    const { id: userId } = ctx;

    const business = await getBusiness(userId);

    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }

    const findVoice = await getVoice(voice);
    if (!findVoice) {
      throw new ZSAError("NOT_FOUND", "Selected voice not available");
    }

    const categoryResult = await db.query.systemPrompt.findFirst({
      where: eq(systemPrompt.id, category),
    });

    if (!categoryResult) {
      throw new ZSAError("NOT_FOUND", "Category not found");
    }

    const agent = await getAgent(business.agentId);
    if (!agent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }

    updateProfile(userId, {
      country,
      phone: businessPhoneNumber,
      name,
    });

    updateBusiness(userId, {
      name: businessName,
      country: businessCountry,
    });

    updateAgent(business.agentId, {
      name: agentName,
      voiceId: findVoice.id,
      categoryId: category,
    });

    const client = new VapiClient({ token: env.VAPI_API_KEY });

    const assistant = await client.assistants.get(agent.assistantId);

    await client.assistants.update(agent.assistantId, {
      name: agentName,
      model: {
        ...assistant.model,
        messages: [
          {
            role: "system",
            content: categoryResult?.systemPrompt as string,
          },
        ],
        provider: assistant.model?.provider as any,
        model: assistant.model?.model as any,
      },
    });
  });
