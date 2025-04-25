import { createServerActionsKeyFactory } from "zsa-react-query";

export const QueryKeyFactory = createServerActionsKeyFactory({
  getBusinessProfile: () => ["getBusinessProfile"] as string[],
  getUser: () => ["getUser"] as string[],
  getKnowledgeBase: (id: string) => ["getKnowledgeBase", id] as string[],
  getSubscription: (id: string | null | undefined) =>
    ["getSubscription", id] as string[],
  getAgent: () => ["getAgent"] as string[],
  getCallLogs: (type: "recent" | "past") => ["getCallLogs", type] as string[],
  getAgentPhoneNumber: () => ["getAgentPhoneNumber"] as string[],
  getCallLog: (id: string) => ["getCallLog", id] as string[],
  getBusiness: () => ["getBusiness"] as string[],
  getVoices: () => ["getVoices"] as string[],
  getCategories: () => ["getCategories"] as string[],
  getPhoneNumbers: () => ["getPhoneNumbers"] as string[],
  getAgentWithVoice: () => ["getAgentWithVoice"] as string[],
  getAgentDetails: (id: string | undefined) =>
    ["getAgentDetails", id] as string[],
  getSubscriptions: () => ["getSubscriptions"] as string[],
  getAccountPreferences: () => ["getAccountPreferences"] as string[],
});
