import { BOTTOM_SIDEBAR_ITEM, SIDEBAR_ITEMS } from "@/mock";
import { Navigation } from "@/modules/dashboard/components/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navigation
        sidebarItems={SIDEBAR_ITEMS}
        bottomSidebarItems={BOTTOM_SIDEBAR_ITEM}
      >
        {children}{" "}
      </Navigation>
    </div>
  );
}
