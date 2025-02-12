"use server";

import { getBusiness } from "@/data-access";
import { getAgent } from "@/data-access/agents";
import {
  createKnowledgeBase,
  deleteKnowledgeBase,
  getKnowledgeBase,
  updateKnowledgeBase,
} from "@/data-access/knowledgeBase";
import { getCategory } from "@/data-access/systemPrompt";
import { authenticationProcedure } from "@/lib/procedures";
import {
  RateLimitConfig,
  RateLimiterUtility,
} from "@/modules/commons/utils/RateLimiterUtility";
import { fileUploadSchema } from "@/modules/knowledge-base/validation";
import { VapiClient } from "@vapi-ai/server-sdk";
import { env } from "env.mjs";
import { ZSAError } from "zsa";
import { deleteVapiKnowledgeBase } from "./vapi";

export const getKnowledgeBaseAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }
    const knowledgeBase = await getKnowledgeBase(business?.id);
    return { success: true, data: knowledgeBase };
  });

export const createKnowledgeBaseAction = authenticationProcedure
  .createServerAction()
  .input(fileUploadSchema)
  .handler(async ({ input, ctx }) => {
    await RateLimiterUtility.limit(RateLimitConfig.API_CALL);
    const { id } = ctx;
    const business = await getBusiness(id);
    const { id: fileId, url, originalName, size } = input;

    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }

    const agent = await getAgent(business.agentId);

    if (!agent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }

    const category = await getCategory(agent.categoryId);
    if (!category) {
      throw new ZSAError("NOT_FOUND", "Category not found");
    }

    const client = new VapiClient({ token: env.VAPI_API_KEY });
    const knowledgeBase = await client.knowledgeBases.create({
      provider: "trieve",
      vectorStoreCreatePlan: {
        fileIds: [fileId],
      },
      vectorStoreSearchPlan: {
        searchType: "fulltext",
      },
      name: `Knowledge Base for ${business.name}`,
    });
    if (!knowledgeBase.id) {
      throw new ZSAError("NOT_FOUND", "Knowledge base not found");
    }

    const assistant = await client.assistants.get(agent.assistantId);

    if (!assistant.model?.model || !assistant.model?.provider) {
      throw new ZSAError("NOT_FOUND", "Model or provider not found");
    }
    await client.assistants.update(agent.assistantId, {
      ...assistant,
      model: {
        ...assistant.model,
        model: assistant.model?.model as any,
        provider: assistant?.model?.provider as any,
        knowledgeBaseId: knowledgeBase.id,
      },
    });

    const [newKnowledgeBase] = await createKnowledgeBase({
      fileId,
      url,
      originalName,
      businessId: business?.id,
      size,
      vapiKnowledgeBaseId: knowledgeBase.id,
    });
    return { success: true, data: newKnowledgeBase };
  });

export const deleteKnowledgeBaseAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }
    const client = new VapiClient({ token: env.VAPI_API_KEY });

    const knowledgeBase = await getKnowledgeBase(business?.id);
    if (!knowledgeBase?.fileId) {
      throw new ZSAError("NOT_FOUND", "Knowledge base not found.");
    }
    await client.knowledgeBases.delete(knowledgeBase?.vapiKnowledgeBaseId);

    await deleteKnowledgeBase(business?.id);

    return { success: true };
  });

export const updateKnowledgeBaseAction = authenticationProcedure
  .createServerAction()
  .input(fileUploadSchema)
  .handler(async ({ ctx, input }) => {
    await RateLimiterUtility.limit(RateLimitConfig.API_CALL);
    const { id: fileId, url, originalName, size } = input;
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const agent = await getAgent(business.agentId);

    if (!agent?.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }
    const knowledgeBase = await getKnowledgeBase(business?.id);

    if (!knowledgeBase?.fileId) {
      throw new ZSAError("NOT_FOUND", "Knowledge base not found.");
    }

    await deleteVapiKnowledgeBase(knowledgeBase?.fileId);

    await updateKnowledgeBase(business?.id, {
      fileId,
      url,
      size,
      originalName,
    });

    return { success: true, data: knowledgeBase };
  });
