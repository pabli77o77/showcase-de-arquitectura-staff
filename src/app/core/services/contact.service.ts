import { Injectable } from '@angular/core';

/**
 * @interface ContactPayload
 * @description Contrato para el envío de mensajes desde el formulario.
 */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * @class ContactService
 * @description Orquestador para la ingesta de mensajes (Serverless Architecture).
 *
 * ARQUITECTURA: Usamos una Lambda-URL como proxy (AWS) para:
 * 1. Desacoplar el frontend de la API de terceros (Resend).
 * 2. Proteger las API Keys que residen seguras en AWS Secrets Manager.
 * 3. Escalar horizontalmente sin gestionar servidores (Zero Ops).
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly LAMBDA_URL = 'https://LAMBDA_URL_PLACEHOLDER.lambda-url.region.on.aws/';

  /**
   * Envía el mensaje al motor de ingesta serverless.
   * @param payload Datos del formulario de contacto.
   * @returns Promesa con el estado de la operación.
   */
  async sendMessage(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
    try {
      // Nota: En producción usaríamos HttpClient de Angular, aquí usamos fetch
      // para mantener el blueprint agnóstico en esta etapa de arquitectura.
      const response = await fetch(this.LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`SERVER_ERROR_${response.status}`);
      }

      return {
        success: true,
        message: 'Mensaje enviado con éxito. El equipo se pondrá en contacto pronto.'
      };

    } catch (error) {
      console.error('[ContactService] Error detectado:', error);
      return {
        success: false,
        message: this.mapErrorToUserFriendlyMessage(error)
      };
    }
  }

  /**
   * Mapeo semántico de errores para la UI.
   * Evitamos mostrar errores técnicos crudos al usuario final.
   */
  private mapErrorToUserFriendlyMessage(error: any): string {
    const errorMsg = error instanceof Error ? error.message : '';
    
    if (errorMsg.includes('SERVER_ERROR_500')) {
      return 'Lo sentimos, el servicio de mensajería está saturado. Inténtalo de nuevo más tarde.';
    }
    
    if (errorMsg.includes('TypeError')) {
      return 'Error de conexión. Revisa tu acceso a internet.';
    }

    return 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.';
  }
}
