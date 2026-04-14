import { create } from "zustand";

type GlobalStore = {
  muted: boolean;
  setMuted: (muted: boolean) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  muted: false,
  setMuted: (muted) => set({ muted }),
}));
