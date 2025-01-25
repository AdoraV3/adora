import { withAuth } from "@/lib/withAuth";
import { Details } from "@/modules/call-logs/pages/Details";

export default async function page() {
  const AuthenticatedPage = await withAuth(Details);
  return <AuthenticatedPage />;
}
