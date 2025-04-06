import { createServerActionsKeyFactory } from "zsa-react-query";

export const QueryKeyFactory = createServerActionsKeyFactory({
  getBusinessProfile: () => ["getBusinessProfile"] as string[],
  getUser: (id: string) => ["getUser", id] as string[],
  getKnowledgeBase: (id: string) => ["getKnowledgeBase", id] as string[],
});
