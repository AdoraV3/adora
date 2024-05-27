import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggleSidebar: (value: boolean) => void;
};

export const useSidebarState = create<SidebarState>(set => ({
  isOpen: false,
  toggleSidebar: () => {
    set(state => ({
      isOpen: !state.isOpen,
    }));
  },
}));
