import { Business } from "@/db/schema";
import { assistantConfig } from "@/mock";
import { env } from "env.mjs";
import { AssistantResponse } from "./type";

export const createAssistant = async (body: Partial<Business>) => {
  const payload = {
    ...assistantConfig,
    ...body,
  };
  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.VAPI_API_KEY}`,
      // eslint-disable-next-line sonarjs/no-duplicate-string
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data: AssistantResponse = await response.json();
  return data;
};

export const updateAssistantKnowledgeBase = async (
  id: string,
  body: string,
) => {
  const payload = {
    ...assistantConfig,
    model: {
      ...assistantConfig.model,
      knowledgeBase: {
        ...assistantConfig.model.knowledgeBase,
        fileIds: [body], // Update with the new fileIds
      },
    },
  };
  const response = await fetch(`https://api.vapi.ai/assistant/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

export const updateAssistant = async (id: string, body: Partial<Business>) => {
  const payload = {
    ...assistantConfig,
    ...body,
  };
  const response = await fetch(`https://api.vapi.ai/assistant/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
