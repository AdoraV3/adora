import { BOTTOM_SIDEBAR_ITEM, SIDEBAR_ITEMS } from "@/mock";
import { DashboardNav } from "@/modules/dashboard/components/DashboardNav";
import { Navigation } from "@/modules/dashboard/components/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex flex-1 flex-col">
      <Navigation
        sidebarItems={SIDEBAR_ITEMS}
        bottomSidebarItems={BOTTOM_SIDEBAR_ITEM}
      >
        <DashboardNav />
        {children}{" "}
      </Navigation>
    </div>
  );
}
