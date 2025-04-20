
import { CVState, CVData } from '@/types';

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    nationality: "",
    birthDate: "",
  },
  contactInfo: {
    email: "",
    phone: "",
    address: "",
  },
  professionalSummary: "",
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
};

export const defaultCVState: CVState = {
  data: defaultCVData,
  selectedTemplate: "modern",
  currentStep: 0,
};
