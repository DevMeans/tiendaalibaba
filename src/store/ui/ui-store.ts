import { create } from "zustand";

interface State {
  isSideOpenMenu: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isOpenModalSize: boolean;
  isOpenModalColor: boolean;
  openModal: (modaltype: string) => void;
  closeModal: (modaltype: string) => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideOpenMenu: false,
  isOpenModalSize: false,
  isOpenModalColor: false,
  openSideMenu: () => set({ isSideOpenMenu: true }),
  closeSideMenu: () => set({ isSideOpenMenu: false }),
  openModal: (modaltype) => {
    if (modaltype == "color") {
      console.log("hola");
      set({ isOpenModalColor: true });
    } else {
      set({ isOpenModalSize: true });
    }
  },
  closeModal: (modaltype) => {
    if (modaltype == "color") {
      set({ isOpenModalColor: false });
    } else {
      set({ isOpenModalSize: false });
    }
  },
}));
