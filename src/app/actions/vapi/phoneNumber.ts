import { headers } from "./knowledgeBase";

export const getVapiPhoneNumber = async (id: string) => {
  const response = await fetch(`https://api.vapi.ai/file/${id}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
export const createVapiPhoneNumber = async (body: any) => {
  const response = await fetch(`https://api.vapi.ai/phone-number`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
