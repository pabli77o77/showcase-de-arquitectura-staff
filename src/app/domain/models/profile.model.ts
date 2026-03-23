/**
 * @file profile.model.ts
 * @description Contrato de datos para el Perfil Profesional (DDD).
 */

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  career_start?: string; // Formato: YYYY-MM
}

export interface ExperiencePeriod {
  start: string; // Formato: YYYY-MM
  end?: string;  // Formato: YYYY-MM (opcional si es actual)
}

export interface Experience {
  company: string;
  period: ExperiencePeriod;
  role: string;
  domain: string;
  stack: string[];
  is_lead: boolean;
  metrics: string[];
}

export interface Skills {
  cloud_data: string[];
  backend: string[];
  frontend: string[];
  architecture: string[];
}

export interface UserProfile {
  personal_info: PersonalInfo;
  summary: string;
  experience: Experience[];
  skills: Skills;
}

/**
 * Modelo enriquecido para la UI (ViewModel)
 */
export interface ExperienceViewModel extends Experience {
  durationLabel: string;
  isCurrent: boolean;
}

export interface UserProfileViewModel extends Omit<UserProfile, 'experience'> {
  experience: ExperienceViewModel[];
  totalExperienceYears: number;
}
