# Showcase de Arquitectura Staff - Pablo Matías Lescano

Este repositorio representa el **Gold Standard** de ingeniería frontend, auditado y certificado el 23 de marzo de 2026. Es una demostración de cómo desacoplar lógica de negocio compleja utilizando **Domain-Driven Design (DDD)** y reactividad granular con **Angular 18 Signals**.

## 🏗 Arquitectura del Sistema (DDD + Signals)

El sistema utiliza DDD para garantizar que el dominio de datos sea agnóstico a la representación visual.

### Ciclo de Vida del Dato (Contenido)

```mermaid
graph LR
    subgraph Dominio
        C[Domain Mappers<br/>Transformations] --> D[Domain Model<br/>Rich Interfaces]
    end
    
    A[cv-data.json<br/>Raw Data] -- HTTP/Fetch --> B[Data Service]
    B --> C
    D --> E[Signal Store<br/>Reactive State]
    E --> F[UI Components<br/>Standalone]
    
    style A fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style B fill:#1e293b,stroke:#64748b,color:#fff
    style C fill:#1e293b,stroke:#64748b,color:#fff
    style D fill:#1e293b,stroke:#64748b,color:#fff
    style E fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style F fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style Dominio fill:#111827,stroke:#334155,stroke-dasharray: 5 5,color:#fff
```

### Flujo de Contacto (Serverless Ingestion)

```mermaid
sequenceDiagram
    autonumber
    participant UI as Contact Form (Signals)
    participant Srv as Contact Service
    participant Lmb as AWS Lambda
    participant API as Resend API
    participant GA as GA4 Tracking
    
    Note over UI, GA: Arquitectura Desacoplada & Serverless
    
    UI->>Srv: HTTP POST (Payload)
    Srv->>Lmb: Trigger Runtime Node (AWS)
    Lmb->>API: Email Delivery Request
    API-->>Lmb: 200 OK
    Lmb-->>Srv: Success Response
    Srv->>GA: track_conversion
    Srv-->>UI: Success State (Glow Animation)
```

## 🛠 Pilares de Ingeniería

1.  **Modularidad Atómica:** Límites estrictos de 300 líneas por archivo para facilitar la mantenibilidad y testeabilidad.
2.  **SSOT (Single Source of Truth):** Sincronización absoluta entre JSON, PDF y UI.
3.  **Capa de Dominio (Mappers):** Lógica algorítmica para el cálculo de seniority (Seniority Real vs Experiencia Listada).
4.  **Resiliencia en Producción:** Gestión de assets mediante rutas absolutas y tags nativos para máxima compatibilidad con AWS Amplify.

## 🚀 Auditoría Automatizada

Para validar que cualquier cambio respete este contrato, se incluye el script `validate_contract.js`.

```bash
node validate_contract.js
```
