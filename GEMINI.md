# CONTRATO DE ARQUITECTURA: GOLD STANDARD

Este documento es el mandato absoluto de diseño para el repositorio **Showcase Staff**. Ninguna modificación debe violar estos pilares bajo pena de fallo en la auditoría.

## 🏛 1. PILARES FUNDAMENTALES

### Pilar 1: Modularidad Atómica (Límite 300 líneas)
Ningún archivo fuente en `src/` debe superar las **300 líneas de código**. Si un componente, servicio o mapper crece más allá de este límite, **DEBE** ser refactorizado en sub-componentes o utilidades puras.

### Pilar 2: SSOT (Single Source of Truth)
Toda la data de perfil se consume desde `public/data/*.json`. La UI debe ser una proyección reactiva (Signals) de estos archivos.

### Pilar 3: Capa de Dominio (Mappers)
Queda prohibido inyectar lógica de transformación pesada en los componentes.
- **Mappers:** Transforman JSON crudo en modelos de dominio ricos.
- **Models:** Interfaces estrictas. Prohibido el uso de `any`.

## 🧠 2. LÓGICA CORE (Seniority)

La antigüedad profesional debe ser calculada algorítmicamente en la capa de mappers:
1.  **Prioridad 1:** Fecha de inicio de carrera (Seniority Real).
2.  **Prioridad 2:** Suma ponderada de experiencias listadas.

## 🌐 3. INFRAESTRUCTURA (Serverless & Assets)

- **Ingesta:** Uso de AWS Lambda Function URL + Resend API.
- **Assets:** Los documentos PDF deben residir en `/assets/docs/`.
- **Download:** Se debe usar el tag `<a>` nativo con el atributo `[download]` para máxima resiliencia en AWS Amplify.

## 🛠 4. STACK TECNOLÓGICO

- **Angular 18+** (Standalone & Signals).
- **Tailwind CSS** (Configuración minimalista).
- **ESLint/Prettier** (Reglas estrictas).

---
**Firmado:** Senior Architect | Lead Auditor
**Última Actualización:** 23 de Marzo, 2026
