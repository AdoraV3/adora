import { withAuth } from "@/lib/withAuth";
import { Home } from "@/modules/home/pages";

export default async function page() {
  const AuthenticatedPage = await withAuth(Home);
  return <AuthenticatedPage />;
}
