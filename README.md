# HeyKid! — Módulo de Gestión y Aprobación de Contactos

Implementación del **Segundo Parcial de Diseño de Sistemas** sobre el sistema *HeyKid!*
diseñado en el Primer Parcial. Este módulo controla el ciclo de vida de una solicitud de
contacto de un menor: creación, aprobación o rechazo por parte del adulto responsable, y
gestión de los contactos autorizados.

- **Backend:** Node.js + Express (arquitectura en capas) + PostgreSQL
- **Frontend:** React + Vite (panel parental, 3 pantallas)
- **Pruebas:** Jest (capa de servicio con repositorios mockeados)

---

## Estructura del proyecto

```
heykid-contactos/
├── backend/
│   ├── src/
│   │   ├── config/db.js                 # Pool de conexión PostgreSQL
│   │   ├── db/schema.sql                # DDL de las 4 entidades
│   │   ├── db/seed.sql                  # Datos de prueba
│   │   ├── repositories/                # Acceso a datos (4 repos)
│   │   ├── services/                    # Reglas de negocio
│   │   ├── controllers/                 # Manejo de peticiones HTTP
│   │   ├── routes/                      # Definición de endpoints
│   │   ├── dtos/                        # Mapeo entidad → respuesta
│   │   ├── errors/                      # Errores de dominio + handler global
│   │   ├── tests/                       # Pruebas Jest
│   │   ├── app.js / server.js
│   ├── scripts/initDb.js               # Crea tablas + carga seed
│   ├── openapi.yaml                    # Documentación de la API
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/client.js               # Cliente HTTP
│   │   ├── pages/                      # 3 pantallas
│   │   ├── components/ui.jsx
│   │   ├── App.jsx / main.jsx / styles.css
│   └── package.json
└── README.md
```

---

## Requisitos

- Node.js 18 o superior
- PostgreSQL 13 o superior

---

## 1) Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales y crear la base: createdb heykid     (o CREATE DATABASE heykid; desde psql)
npm run db:init
# Levantar la API (http://localhost:3000)
npm start
```

Verificación rápida: `GET http://localhost:3000/api/health` <!--  debe responder Status: Ok -->

### Ejecutar las pruebas

```bash
cd backend
npm test
```

Las pruebas no requieren base de datos: mockean la capa de repositorios para
validar las reglas de negocio del servicio.

---

## 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

La demo trabaja con el perfil del menor **Mateo (ID 1)** y el adulto responsable **Nicolás Auger (ID 1)**, según el seed.

---

## Endpoints principales

| Operación | Método y ruta |
| --- | --- |
| Crear solicitud | `POST /api/solicitudes-contacto` |
| Listar solicitudes de un perfil | `GET /api/perfiles-menor/{perfilMenorId}/solicitudes?estado=PENDIENTE` |
| Aprobar solicitud | `PUT /api/solicitudes-contacto/{solicitudId}/aprobar` |
| Rechazar solicitud | `PUT /api/solicitudes-contacto/{solicitudId}/rechazar` |
| Listar contactos autorizados | `GET /api/perfiles-menor/{perfilMenorId}/contactos-autorizados` |
| Desactivar contacto | `PUT /api/contactos-autorizados/{contactoId}/desactivar` |

Documentación completa en `backend/openapi.yaml` (se puede pegar en
[editor.swagger.io](https://editor.swagger.io)).

---

## Regla de negocio principal

Una solicitud de contacto solo puede ser aprobada o rechazada por el adulto responsable asociado al perfil del menor. Además, no se permite resolver solicitudes inexistentes, ya resueltas, ni generar contactos duplicados.

---

## Datos de prueba (seed)

| ID | Usuario | Rol |
| --- | --- | --- |
| 1 | Nicolás Auger | Adulto responsable |
| 2 | Mateo Auger | Menor (perfil 1) |
| 3 | Nazareno Napoli | Adulto autorizado (contacto aprobado) |
| 4 | Fernanda Jimenez | Adulto autorizado (solicitud pendiente) |
| 5 | Lucía Pérez | Adulto autorizado (solicitud rechazada) |
