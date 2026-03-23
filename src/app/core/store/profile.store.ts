import { Injectable, computed, signal } from '@angular/core';
import { UserProfile, UserProfileViewModel } from '../../domain/models/profile.model';
import { ProfileMapper } from '../../domain/mappers/profile.mapper';

/**
 * @class ProfileStore
 * @description Gestión de estado reactiva mediante Angular Signals.
 * Implementa un flujo unidireccional de datos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileStore {
  // Estado base privado (Raw Data)
  private readonly _profile = signal<UserProfile>(this.getInitialState());
  
  // Señal de control para el idioma
  private readonly _language = signal<'es' | 'en'>('es');

  // Selectores Computados (Proyecciones del Dominio)
  readonly viewModel = computed<UserProfileViewModel>(() => 
    ProfileMapper.mapToViewModel(this._profile())
  );

  readonly language = this._language.asReadonly();

  /**
   * Actualiza el idioma y dispara la reactividad en toda la UI.
   */
  updateLanguage(lang: 'es' | 'en'): void {
    if (this._language() === lang) return;
    this._language.set(lang);
    
    // Aquí se dispararía la carga de datos asíncrona si fuera necesario
    // Por ahora, simulamos el cambio de datos del blueprint
    console.log(`[Store] Idioma cambiado a: ${lang}`);
  }

  /**
   * Blueprint inicial para el showcase (John Doe / Staff Engineer)
   */
  private getInitialState(): UserProfile {
    return {
      personal_info: {
        name: 'John Doe',
        title: 'Staff Software Engineer | Cloud Architect',
        location: 'Remote / Global',
        email: 'john.doe@engineering.test',
        phone: '+1 555-CORE-DNA',
        linkedin: 'linkedin.com/in/johndoe-staff',
        career_start: '2010-01'
      },
      summary: 'Arquitecto con más de {{years}} años de experiencia liderando ecosistemas distribuidos.',
      experience: [
        {
          company: 'Tech Giants Inc.',
          period: { start: '2020-01' },
          role: 'Staff Engineer',
          domain: 'Cloud Infrastructure',
          stack: ['Angular', 'Go', 'AWS'],
          is_lead: true,
          metrics: ['Optimización del 40% en costos cloud', 'Liderazgo de 5 equipos cross-functional']
        }
      ],
      skills: {
        cloud_data: ['AWS', 'Terraform', 'Snowflake'],
        backend: ['.NET 8', 'Node.js', 'Python'],
        frontend: ['Angular 18', 'Signals', 'RxJS'],
        architecture: ['DDD', 'Event-Driven', 'Microservices']
      }
    };
  }
}
