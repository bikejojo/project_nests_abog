<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Backend Procesos Judiciales</h1>

<p align="center">
  Proyecto backend desarrollado con <a href="https://nestjs.com/">NestJS</a>, utilizando <strong>TypeScript</strong>, <strong>GraphQL</strong>, <strong>Prisma ORM</strong> y <strong>PostgreSQL</strong>, siguiendo una arquitectura limpia y moderna.
</p>

---

## 🚀 Tecnologías utilizadas

Este proyecto está construido con las siguientes tecnologías:

- **[NestJS](https://nestjs.com/)** – Framework progresivo para aplicaciones del lado del servidor en Node.js
- **[TypeScript](https://www.typescriptlang.org/)** – Superset de JavaScript con tipado estático
- **[GraphQL](https://graphql.org/)** – Lenguaje de consulta de APIs eficiente y flexible
- **[Prisma ORM](https://www.prisma.io/)** – ORM moderno para bases de datos relacionales
- **[PostgreSQL](https://www.postgresql.org/)** – Sistema de base de datos relacional utilizado
- **[Redis](https://redis.io/)** – Para caching y otras operaciones (opcional, si lo usas)
- **Docker (opcional)** – Para entornos consistentes

---

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- Node.js (v18.x o superior recomendado)
- npm (v9+)
- PostgreSQL
- Redis (opcional)
- Prisma CLI: `npm install -g prisma`

---

## ⚙️ Instalación y configuración

```bash
# Clona el repositorio
git clone https://gitlab.com/workcorp/backend-procesos-judiciales.git
cd backend-procesos-judiciales

# Instala dependencias
npm install

# Configura las variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales de PostgreSQL y Redis
