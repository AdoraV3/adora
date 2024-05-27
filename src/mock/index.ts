import { MainNavItem, NavItem } from "@/modules/dashboard/types";

export const SIDEBAR_ITEMS: Array<MainNavItem> = [
  {
    title: "Dashboard",
    href: "/dashboard/loan-requests",
    icon: "Dashboard",
  },
  {
    title: "Call Logs",
    href: "/dashboard/loan-requestors",
    icon: "Call",
  },
  {
    title: "Knowledge Base",
    href: "/dashboard/investors",
    icon: "KnowledgeBase",
  },
  {
    title: "Outbound Calls",
    icon: "OutboundCall",
    // items: [
    //   { title: "Payment", href: "/dashboard/users" },
    //   { title: "Database API", href: "/dashboard/roles" },
    //   { title: "Settings", href: "/dashboard/roles" },
    // ],
  },
  { title: "Payment", href: "/dashboard/users", icon: "Wallet" },
  { title: "Database API", href: "/dashboard/roles", icon: "Api" },
  { title: "Settings", href: "/dashboard/roles", icon: "Settings" },
];

export const BOTTOM_SIDEBAR_ITEM: NavItem[] = [
  { title: "Log out", href: "/", icon: "Logout", isButton: true },
];
