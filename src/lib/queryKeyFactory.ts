import { createServerActionsKeyFactory } from "zsa-react-query";

export const QueryKeyFactory = createServerActionsKeyFactory({
  getBusinessProfile: (id: string) => ["getBusinessProfile", id] as string[],
  getUser: (id: string) => ["getUser", id] as string[],
  getKnowledgeBase: (id: string) => ["getKnowledgeBase", id] as string[],
});
