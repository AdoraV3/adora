"use server";

import { getBusiness } from "@/data-access";
import { getAgent } from "@/data-access/agents";
import {
  createKnowledgeBase,
  deleteKnowledgeBase,
  getKnowledgeBase,
  updateKnowledgeBase,
} from "@/data-access/knowledgeBase";
import { createTransaction } from "@/lib/create-transaction";
import { authenticationProcedure } from "@/lib/procedures";
import { fileUploadSchema } from "@/modules/knowledge-base/validation";
import { ZSAError } from "zsa";
import { deleteVapiKnowledgeBase, updateAssistantKnowledgeBase } from "./vapi";

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
    const { id } = ctx;
    const business = await getBusiness(id);
    const { id: fileId, url, originalName, size } = input;

    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found");
    }

    const agent = await getAgent(business.agentId);

    if (!agent || !agent.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }

    await updateAssistantKnowledgeBase(agent?.assistantId, fileId);
    const [newKnowledgeBase] = await createKnowledgeBase({
      fileId,
      url,
      originalName,
      businessId: business?.id,
      size,
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

    const knowledgeBase = await getKnowledgeBase(business?.id);

    await createTransaction(async trx => {
      if (!knowledgeBase || !knowledgeBase.fileId) {
        throw new ZSAError("NOT_FOUND", "Knowledge base not found.");
      }
      await deleteVapiKnowledgeBase(knowledgeBase?.fileId);
      await deleteKnowledgeBase(business?.id, trx);
    });

    return { success: true };
  });

export const updateKnowledgeBaseAction = authenticationProcedure
  .createServerAction()
  .input(fileUploadSchema)
  .handler(async ({ ctx, input }) => {
    const { id: fileId, url, originalName, size } = input;
    const { id } = ctx;
    const business = await getBusiness(id);
    if (!business) {
      throw new ZSAError("NOT_FOUND", "Business not found.");
    }

    const agent = await getAgent(business.agentId);

    if (!agent || !agent.assistantId) {
      throw new ZSAError("NOT_FOUND", "Agent not found");
    }
    const knowledgeBase = await getKnowledgeBase(business?.id);

    if (!knowledgeBase || !knowledgeBase.fileId) {
      throw new ZSAError("NOT_FOUND", "Knowledge base not found.");
    }

    await deleteVapiKnowledgeBase(knowledgeBase?.fileId);

    await updateKnowledgeBase(business?.id, {
      fileId,
      url,
      size,
      originalName,
    });

    // await deleteKnowledgeBase(business?.id);
    return { success: true, data: knowledgeBase };
  });
