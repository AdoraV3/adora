import { headers } from "./knowledgeBase";
import { CreateToolDTO } from "./type";

export const createVapiTools = async (body: CreateToolDTO) => {
  const response = await fetch(`https://api.vapi.ai/tool`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
