import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileStore } from '../../core/store/profile.store';
import { ContactService, ContactPayload } from '../../core/services/contact.service';

/**
 * @component ProfileComponent (Smart)
 * @description Orquestador central de la vista del Perfil Profesional.
 * Implementa el patrón Smart/Presentational delegando el estado al Signal Store.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // 🔌 Inyección de Dependencias Moderna
  private readonly store = inject(ProfileStore);
  private readonly contactService = inject(ContactService);

  // 🧬 Selectores Reactivos del Dominio
  readonly profile = this.store.viewModel;

  // ⚡ Local Signals para Gestión de UI
  readonly isSending = signal<boolean>(false);
  readonly isSent = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  /**
   * Orquestación del envío de mensajes.
   * Demuestra cómo combinar servicios de infraestructura con estado reactivo local.
   */
  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    this.isSending.set(true);
    this.errorMessage.set(null);

    const result = await this.contactService.sendMessage(payload);

    if (result.success) {
      this.isSent.set(true);
      form.reset();
      // Reset del estado de éxito tras 5 segundos (Animación de Glow)
      setTimeout(() => this.isSent.set(false), 5000);
    } else {
      this.errorMessage.set(result.message);
    }

    this.isSending.set(false);
  }
}
