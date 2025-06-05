# Backend - Procesos Judiciales

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <b>Backend API construida con NestJS + GraphQL + Prisma + PostgreSQL</b>
</p>

---

## 🚀 Tecnologías utilizadas

Este proyecto utiliza las siguientes tecnologías principales:

- **[NestJS](https://nestjs.com/)**: Framework progresivo para aplicaciones Node.js
- **[GraphQL](https://graphql.org/)**: Lenguaje de consultas para APIs eficientes
- **[Prisma ORM](https://www.prisma.io/)**: ORM moderno y potente para bases de datos
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de base de datos relacional
- **[Redis](https://redis.io/)**: Usado como caché para mejorar el rendimiento
- **[Docker](https://www.docker.com/)** (opcional): Para entornos reproducibles

---

## ⚙️ Requisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js (>= v18)
- npm o yarn
- PostgreSQL
- Redis (opcional pero recomendado para caching)
- Prisma CLI: `npm install -g prisma`

---

## 🧭 Instalación y ejecución del servidor

### 1. Clonar el repositorio

```bash
git clone https://gitlab.com/workcorp/backend-procesos-judiciales.git
cd backend-procesos-judiciales
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Luego edita `.env` y agrega la configuración de tu base de datos PostgreSQL, Redis y demás valores necesarios, por ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_basedatos"
REDIS_URL="redis://localhost:6379"
PORT=3000
```

---

## 🔄 Migraciones con Prisma

Asegúrate de que tu base de datos esté corriendo y que `DATABASE_URL` esté correctamente configurado.

### Crear y ejecutar migraciones

```bash
npx prisma migrate dev --name init
```

Este comando:

- Ejecutará las migraciones definidas en `/prisma/migrations`
- Creará el esquema en tu base de datos
- Actualizará automáticamente el cliente de Prisma

### Otros comandos útiles

```bash
# Abre Prisma Studio para ver la base de datos de forma gráfica
npx prisma studio

# Genera el cliente de Prisma (útil después de actualizar el esquema)
npx prisma generate
```

---

## 🏁 Levantar el servidor

```bash
# En modo desarrollo (con hot reload)
npm run start:dev

# En modo producción (requiere build previo)
npm run start:prod

# Modo normal (sin hot reload)
npm run start
```

Una vez iniciado, el backend estará disponible en:

```
http://localhost:3000
```

Y el Playground de GraphQL en:

```
http://localhost:3000/graphql
```

---

## 🧪 Ejecutar tests

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

---

## 📂 Estructura del proyecto

```bash
src/
├── modules/           # Módulos de dominio (usuarios, abogados, empresas, etc.)
├── common/            # Filtros, pipes, decoradores, etc.
├── config/            # Configuraciones globales
├── prisma/            # Cliente Prisma y seeders
└── main.ts            # Punto de entrada principal
```

---

## 🛰️ GraphQL Playground

Accede al playground cuando el servidor esté en ejecución:

```bash
http://localhost:3000/graphql
```

Desde ahí puedes hacer consultas, mutaciones y explorar el esquema con autocompletado.

---

## ✍️ Contribuciones

1. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Realiza tus cambios y haz commit
3. Envía un merge request

---

## 📄 Licencia

MIT License. © 2025 Workcorp
