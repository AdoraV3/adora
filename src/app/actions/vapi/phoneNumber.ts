import { headers } from "./knowledgeBase";
import { PhoneNumber } from "./type";

export const getVapiPhoneNumber = async (id: string) => {
  const response = await fetch(`https://api.vapi.ai/phone-number/${id}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const getVapiPhoneNumbers = async (): Promise<PhoneNumber[]> => {
  const response = await fetch(`https://api.vapi.ai/phone-number`, {
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

export const updateVapiPhoneNumber = async (id: string, body: any) => {
  const response = await fetch(`https://api.vapi.ai/phone-number/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });

  return response.json();
};
