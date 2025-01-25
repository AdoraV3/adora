import { withAuth } from "@/lib/withAuth";
import { OutboundCalls } from "@/modules/outbound-calls/pages/OutboundCalls";

export default async function page() {
  const AuthenticatedPage = await withAuth(OutboundCalls);
  return <AuthenticatedPage />;
}
