import { withAuth } from "@/lib/withAuth";
import { CreateKnowledgeBase } from "@/modules/knowledge-base/pages/CreateKnowledgeBase";

export default async function page() {
  const AuthenticatedPage = await withAuth(CreateKnowledgeBase);
  return <AuthenticatedPage />;
}
