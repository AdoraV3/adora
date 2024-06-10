"use client";

import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/mock";
import { useSidebarState } from "@/store/sidebar";
import { PropsWithChildren } from "react";
import { MainNavItem, NavItem } from "../types";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export interface NavigationProps {
  sidebarItems: MainNavItem[];
  bottomSidebarItems: NavItem[];
}

export function Navigation({
  children,
  sidebarItems,
  bottomSidebarItems,
}: //   type = "user",

PropsWithChildren<NavigationProps>) {
  const isOpen = useSidebarState(state => state.isOpen);
  const setIsOpen = useSidebarState(state => state.toggleSidebar);
  return (
    <>
      <MobileNav
        type="user"
        sidebarNavItems={sidebarItems}
        bottomSidebarItems={bottomSidebarItems}
      />

      <div
        className={cn(` relative grid
        items-start transition-all duration-300 ease-out ${
          isOpen
            ? "lg:grid-cols-[16.26rem_minmax(0,1fr)]"
            : "lg:grid-cols-[100px_minmax(0,1fr)]"
        }`)}
      >
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sidebarItems={SIDEBAR_ITEMS}
          bottomSidebarItems={[]}
        />

        <main className="flex container py-5 flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}
