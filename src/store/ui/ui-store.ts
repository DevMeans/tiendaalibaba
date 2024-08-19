import { create } from "zustand";

interface State {
  isSideOpenMenu: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isOpenModalSize: boolean;
  isOpenModalColor: boolean;
  isOpenModalTag: boolean;
  isOpenModalCategory: boolean;

  openModal: (modaltype: string) => void;
  closeModal: (modaltype: string) => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideOpenMenu: false,
  isOpenModalSize: false,
  isOpenModalColor: false,
  isOpenModalTag: false,
  isOpenModalCategory: false,

  openSideMenu: () => set({ isSideOpenMenu: true }),
  closeSideMenu: () => set({ isSideOpenMenu: false }),
  openModal: (modaltype) => {
    if (modaltype == "color") {
      set({ isOpenModalColor: true });
    }
    if (modaltype == "size") {
      set({ isOpenModalSize: true });
    }
    if (modaltype == "tag") {
      set({ isOpenModalTag: true });
    }
    if (modaltype == "category") {
      set({ isOpenModalCategory: true });
    }
  },
  closeModal: (modaltype) => {
    if (modaltype == "color") {
      set({ isOpenModalColor: false });
    }
    if (modaltype == "size") {
      set({ isOpenModalSize: false });
    }
    if (modaltype == "tag") {
      set({ isOpenModalTag: false });
    }
    if (modaltype == "category") {
      set({ isOpenModalCategory: false });
    }
  },
}));
