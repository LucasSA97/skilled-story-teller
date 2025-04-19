
// CV data types
export interface PersonalInfo {
  fullName: string;
  photo?: string;
  nationality: string;
  birthDate: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  current?: boolean;
}

export interface Skill {
  id: string;
  name: string;
}

export type LanguageProficiency = "Básico" | "Intermedio" | "Avanzado" | "Nativo";

export interface Language {
  id: string;
  name: string;
  level: LanguageProficiency;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export type TemplateType = "modern" | "classic" | "creative" | "minimal";

export interface CVState {
  data: CVData;
  selectedTemplate: TemplateType;
  currentStep: number;
}
