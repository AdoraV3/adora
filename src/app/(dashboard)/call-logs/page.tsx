import { withAuth } from "@/lib/withAuth";
import { CallLogs } from "@/modules/call-logs/pages/CallLogs";

export default async function page() {
  const AuthenticatedPage = await withAuth(CallLogs);
  return <AuthenticatedPage />;
}
