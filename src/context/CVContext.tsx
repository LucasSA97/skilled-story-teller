import { createContext, useContext, ReactNode } from "react";
import { CVData, CVState, TemplateType } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Datos por defecto para el CV
const defaultCVData: CVData = {
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

const defaultCVState: CVState = {
  data: defaultCVData,
  selectedTemplate: "modern",
  currentStep: 0,
};

interface CVContextType {
  cvState: CVState;
  updatePersonalInfo: (personalInfo: Partial<CVData["personalInfo"]>) => void;
  updateContactInfo: (contactInfo: Partial<CVData["contactInfo"]>) => void;
  updateProfessionalSummary: (summary: string) => void;
  addWorkExperience: (experience: Omit<CVData["workExperience"][0], "id">) => void;
  updateWorkExperience: (id: string, experience: Partial<Omit<CVData["workExperience"][0], "id">>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<CVData["education"][0], "id">) => void;
  updateEducation: (id: string, education: Partial<Omit<CVData["education"][0], "id">>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (id: string) => void;
  addLanguage: (language: Omit<CVData["languages"][0], "id">) => void;
  updateLanguage: (id: string, language: Partial<Omit<CVData["languages"][0], "id">>) => void;
  removeLanguage: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCVContext must be used within a CVProvider");
  }
  return context;
};

export const CVProvider = ({ children }: { children: ReactNode }) => {
  const [cvState, setCVState] = useLocalStorage<CVState>("cv-state", defaultCVState);

  const updatePersonalInfo = (personalInfo: Partial<CVData["personalInfo"]>) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        personalInfo: {
          ...prev.data.personalInfo,
          ...personalInfo,
        },
      },
    }));
  };

  const updateContactInfo = (contactInfo: Partial<CVData["contactInfo"]>) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        contactInfo: {
          ...prev.data.contactInfo,
          ...contactInfo,
        },
      },
    }));
  };

  const updateProfessionalSummary = (summary: string) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        professionalSummary: summary,
      },
    }));
  };

  const addWorkExperience = (experience: Omit<CVData["workExperience"][0], "id">) => {
    const id = crypto.randomUUID();
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        workExperience: [...prev.data.workExperience, { ...experience, id }],
      },
    }));
  };

  const updateWorkExperience = (
    id: string,
    experience: Partial<Omit<CVData["workExperience"][0], "id">>
  ) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        workExperience: prev.data.workExperience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
    }));
  };

  const removeWorkExperience = (id: string) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        workExperience: prev.data.workExperience.filter((exp) => exp.id !== id),
      },
    }));
  };

  const addEducation = (education: Omit<CVData["education"][0], "id">) => {
    const id = crypto.randomUUID();
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        education: [...prev.data.education, { ...education, id }],
      },
    }));
  };

  const updateEducation = (
    id: string,
    education: Partial<Omit<CVData["education"][0], "id">>
  ) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        education: prev.data.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        ),
      },
    }));
  };

  const removeEducation = (id: string) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        education: prev.data.education.filter((edu) => edu.id !== id),
      },
    }));
  };

  const addSkill = (skill: string) => {
    const id = crypto.randomUUID();
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        skills: [...prev.data.skills, { id, name: skill }],
      },
    }));
  };

  const removeSkill = (id: string) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        skills: prev.data.skills.filter((skill) => skill.id !== id),
      },
    }));
  };

  const addLanguage = (language: Omit<CVData["languages"][0], "id">) => {
    const id = crypto.randomUUID();
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        languages: [...prev.data.languages, { ...language, id }],
      },
    }));
  };

  const updateLanguage = (
    id: string,
    language: Partial<Omit<CVData["languages"][0], "id">>
  ) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        languages: prev.data.languages.map((lang) =>
          lang.id === id ? { ...lang, ...language } : lang
        ),
      },
    }));
  };

  const removeLanguage = (id: string) => {
    setCVState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        languages: prev.data.languages.filter((lang) => lang.id !== id),
      },
    }));
  };

  const setTemplate = (template: TemplateType) => {
    setCVState((prev) => ({
      ...prev,
      selectedTemplate: template,
    }));
  };

  const nextStep = () => {
    setCVState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const prevStep = () => {
    setCVState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  };

  const goToStep = (step: number) => {
    setCVState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  return (
    <CVContext.Provider
      value={{
        cvState,
        updatePersonalInfo,
        updateContactInfo,
        updateProfessionalSummary,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        setTemplate,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};
