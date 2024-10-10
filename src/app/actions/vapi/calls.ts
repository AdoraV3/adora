import { z } from "zod";
import { callLogsSchema } from "../../../modules/call-logs/validation";
import { headers } from "./knowledgeBase";
import { InboundPhoneCall } from "./type";

export const getVapiCalls = async (
  params: z.infer<typeof callLogsSchema>,
): Promise<InboundPhoneCall[]> => {
  const queryParams = new URLSearchParams();

  // Add parameters to queryParams if they are defined
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const url = `https://api.vapi.ai/call?${queryParams.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const getVapiCall = async (id: string): Promise<InboundPhoneCall> => {
  const url = `https://api.vapi.ai/call/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
