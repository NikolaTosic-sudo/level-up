import { create } from "zustand";

interface ProfileWrapStore {
  loading: boolean;
  disabled: boolean;

  currentModule: string;
  setCurrentModule: (currentModule: string) => void;
}

export const useProfileWrapStore = create<ProfileWrapStore>((set) => ({
  loading: false,
  disabled: false,

  currentModule: "dash",
  setCurrentModule: (currentModule) => set({ currentModule }),
}));
