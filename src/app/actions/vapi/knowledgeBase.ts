import { env } from "env.mjs";

export const headers = {
  Authorization: `Bearer ${env.VAPI_API_KEY}`,
  "Content-Type": "application/json",
};
export const createVapiKnowledgeBase = async (body: any) => {
  const response = await fetch("https://api.vapi.ai/knowledge-base", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${env.VAPI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const deleteVapiKnowledgeBase = async (id: string) => {
  const response = await fetch(`https://api.vapi.ai/file/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const getVapiKnowledgeBase = async (id: string) => {
  const response = await fetch(`https://api.vapi.ai/file/${id}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
