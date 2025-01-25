import { withAuth } from "@/lib/withAuth";
import { AccountSettings } from "@/modules/home/pages/AccountSettings";

export default async function page() {
  const AuthenticatedPage = await withAuth(AccountSettings);
  return <AuthenticatedPage />;
}
