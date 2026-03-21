import { create } from "zustand";

// investigate the erasableSyntaxOnly property on Typescript
export enum CurrentStepsEnum {
  Form,
  Skills,
  Quests,
  Finish,
}

interface ProfileCreationStore {
  loading: boolean;
  disabled: boolean;

  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

export const useProfileCreationStore = create<ProfileCreationStore>((set) => ({
  loading: false,
  disabled: false,

  currentStep: 0,
  setCurrentStep: (currentStep) => set({ currentStep }),
}));
