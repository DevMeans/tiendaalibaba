import { create } from "zustand";

interface State {
  isSideOpenMenu: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideOpenMenu: false,
  openSideMenu: () => set({ isSideOpenMenu: true }),
  closeSideMenu: () => set({ isSideOpenMenu: false }),
}));
