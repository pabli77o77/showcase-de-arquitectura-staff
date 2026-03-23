import { UserProfile, Experience, UserProfileViewModel, ExperienceViewModel } from '../models/profile.model';

/**
 * @class ProfileMapper
 * @description Transforma el modelo crudo a un ViewModel enriquecido.
 * No contiene estado; es lógica pura y testeable.
 */
export class ProfileMapper {
  private static readonly SOLAR_YEAR_DAYS = 365.25;
  private static readonly DAY_MS = 1000 * 60 * 60 * 24;

  static mapToViewModel(raw: UserProfile): UserProfileViewModel {
    const totalExperienceYears = this.calculateTotalYears(raw);
    const enrichedExperience = raw.experience.map(exp => this.mapExperience(exp));

    return {
      ...raw,
      summary: raw.summary.replace('{{years}}', totalExperienceYears.toString()),
      experience: enrichedExperience,
      totalExperienceYears
    };
  }

  private static mapExperience(exp: Experience): ExperienceViewModel {
    const start = new Date(exp.period.start);
    const end = exp.period.end ? new Date(exp.period.end) : new Date();
    const isCurrent = !exp.period.end;

    return {
      ...exp,
      isCurrent,
      durationLabel: this.formatDuration(start, end)
    };
  }

  /**
   * Cálculo algorítmico de seniority según prioridades auditadas.
   */
  static calculateTotalYears(profile: UserProfile): number {
    // Prioridad 1: Fecha de inicio de carrera explícita (Seniority Real)
    if (profile.personal_info.career_start) {
      const start = new Date(profile.personal_info.career_start).getTime();
      return this.calculateYearsFromTimestamp(start);
    }

    // Prioridad 2: Fallback basado en la experiencia más antigua
    if (!profile.experience || profile.experience.length === 0) return 0;
    
    const dates = profile.experience.map(e => new Date(e.period.start).getTime());
    const minDate = Math.min(...dates);
    
    return this.calculateYearsFromTimestamp(minDate);
  }

  private static calculateYearsFromTimestamp(timestamp: number): number {
    const diffMs = Date.now() - timestamp;
    const diffDays = diffMs / this.DAY_MS;
    return Math.floor(diffDays / this.SOLAR_YEAR_DAYS);
  }

  private static formatDuration(start: Date, end: Date): string {
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();
    
    if (months <= 0) return '0 meses';

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} año${years > 1 ? 's' : ''}`);
    if (remainingMonths > 0) parts.push(`${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`);

    return parts.join(', ');
  }
}
