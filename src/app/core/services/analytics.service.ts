import { Injectable, isDevMode } from '@angular/core';

declare const gtag: Function;

/**
 * @class AnalyticsService
 * @description Gestión de telemetría resiliente (Fail-Safe Pattern).
 * Diseñado para evitar errores fatales si GA4/GTM es bloqueado por AdBlockers.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly MEASUREMENT_ID = 'G-MEASUREMENT_ID_PLACEHOLDER';

  /**
   * Rastrear la descarga del CV.
   * @param lang Idioma del CV descargado.
   * @param format Formato del archivo.
   */
  trackCvDownload(lang: string, format: string = 'pdf'): void {
    this.trackEvent('cv_download', {
      language: lang,
      file_format: format,
      version: 'gold_standard_2026'
    });
  }

  /**
   * Rastrear cambios en el modo de visualización.
   * @param mode El nuevo modo de visualización ('frontend' | 'data').
   */
  trackViewModeChange(mode: string): void {
    this.trackEvent('view_mode_change', {
      view_mode: mode
    });
  }

  /**
   * Envía eventos a la capa de telemetría de forma segura.
   * @param eventName Nombre del evento.
   * @param params Parámetros adicionales.
   */
  private trackEvent(eventName: string, params: object): void {
    if (this.isAnalyticsAvailable()) {
      try {
        gtag('event', eventName, params);
      } catch (err) {
        this.safeLog('Error al enviar evento a GA4:', err);
      }
    } else {
      this.safeLog(`[Analytics] Evento capturado (AdBlocker activo): ${eventName}`, params);
    }
  }

  /**
   * Detecta si el objeto gtag está presente en el contexto global.
   * Evita errores ERR_BLOCKED_BY_CLIENT.
   */
  private isAnalyticsAvailable(): boolean {
    return typeof gtag === 'function';
  }

  /**
   * Logueo seguro para evitar ruido en consola de producción.
   */
  private safeLog(msg: string, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.info(`[Analytics Debug] ${msg}`, ...optionalParams);
    }
  }
}
