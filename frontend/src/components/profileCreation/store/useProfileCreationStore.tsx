import type { Dayjs } from "dayjs";
import { create } from "zustand";

// investigate the erasableSyntaxOnly property on Typescript
export enum CurrentStepsEnum {
  Form,
  Skills,
  Quests,
  Finish,
}

type ProfilePicture = {
  file: File;
  fileList: File[];
};

interface FormData {
  firstName: string;
  lastName: string;
  nickname: string;
  dateOfBirth: Dayjs | null;
  profilePicture: ProfilePicture | null;
}

interface ProfileCreationStore {
  loading: boolean;
  disabled: boolean;

  formData: FormData;

  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

const InitalFormData = {
  firstName: "",
  lastName: "",
  nickname: "",
  dateOfBirth: null,
  profilePicture: null,
};

export const useProfileCreationStore = create<ProfileCreationStore>((set) => ({
  loading: false,
  disabled: false,

  formData: InitalFormData,

  currentStep: 0,
  setCurrentStep: (currentStep) => set({ currentStep }),
}));
