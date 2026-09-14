# Hispaniarum

Plataforma de capacitación en línea (estilo Coursera / Udemy / Hotmart) para
profesionales y empresas de Ecuador, construida con [Next.js](https://nextjs.org)
y Tailwind CSS. Conserva la identidad visual "paper" (tipografía Onest,
contornos negros, sombras duras, acentos pastel) del prototipo original.

**Demo en vivo:** desplegado en Vercel — ver el enlace en el repo/Vercel dashboard.

## Stack

- **Next.js 16** (App Router, Server Actions) + Tailwind CSS 4.
- **Prisma + Postgres (Neon, vía Vercel Storage)**. `DATABASE_URL` es la
  conexión pooled (runtime) y `DATABASE_URL_UNPOOLED` la directa (para
  `prisma db push`), ambas inyectadas automáticamente por la integración.
- **Auth.js (NextAuth v5)** con proveedor de credenciales (email + contraseña
  con hash bcrypt) y sesión JWT. Rutas bajo `/dashboard` y `/admin` están
  protegidas por `proxy.ts` (antes "middleware"); `/admin` además exige
  rol `ADMIN`.

## Funcionalidades incluidas

- **Home** de marketing, **catálogo de cursos** con filtros, **ficha de
  curso** con temario, **certificaciones** (MDT + empresarial), **empresas**,
  **precios**, **login/registro reales** y **panel del estudiante** con datos
  reales de la base de datos.
- **Carrito → inscripción real**: al finalizar la "compra" (sin pagos todavía)
  se crean registros `Enrollment` reales para el usuario autenticado.
- **Progreso y certificados**: al completar un curso (100%) se emite un
  **certificado en PDF real** (código único + QR) con **verificación
  pública** en `/verificar`.
- **Panel de administración** (`/admin/cursos`, solo rol `ADMIN`): crear,
  editar y eliminar cursos — incluye editor de temario. El catálogo entero
  vive en la base de datos, no en archivos estáticos.

## Desarrollo local

Este proyecto usa Postgres (Neon) tanto en producción como en desarrollo —
no hay una base local separada. Pide el `DATABASE_URL` / `DATABASE_URL_UNPOOLED`
de Neon (dashboard de Neon, o `vercel env pull` si tienes acceso al proyecto
de Vercel) y ponlos en tu `.env`:

```bash
npm install
```

`.env` (no se versiona):

```
DATABASE_URL="<connection string pooled de Neon>"
DATABASE_URL_UNPOOLED="<connection string directa de Neon>"
AUTH_SECRET="<genera uno con: openssl rand -base64 32>"
```

```bash
npx prisma db push   # sincroniza el esquema (no usamos archivos de migración todavía)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar contenido

- **Cursos**: se editan desde `/admin/cursos` (rol `ADMIN`), no en código.
  `prisma/seed-data.ts` es solo el catálogo semilla inicial, usado una vez
  por `npm run db:seed` — no se lee en tiempo de ejecución.
- **Categorías, instructores, planes, FAQ, marca**: siguen siendo datos de
  plantilla en `app/data/` (no hay panel de administración para esto aún).

Componentes de UI reutilizables en `app/components/ui.tsx`
(`Highlight`, `Tag`, `CertBadge`, `RatingStars`, botones, encabezados de
sección) y tarjetas en `CourseCard.tsx` / `CategoryCard.tsx`.

## Cuenta de administrador

Se crea automáticamente en el primer build (`vercel-build` corre el seed)
usando las variables de entorno `ADMIN_EMAIL` / `ADMIN_PASSWORD` del
proyecto en Vercel. **Cámbiala** apenas confirmes acceso — hoy no hay
pantalla de "cambiar contraseña"; hazlo directamente en la base de datos o
pídeme que la agregue.

## Qué falta para producción real

Pagos, generación de certificados ya está ✅ pero falta:
panel de administración de categorías/instructores/planes, panel de
empresa, evaluaciones, notificaciones transaccionales, facturación
electrónica (SRI) y el convenio real de certificación con el Ministerio
del Trabajo del Ecuador. Los textos actuales sobre ese aval son contenido
de marketing/plantilla — confírmalo y formalízalo antes de operar en
producción real (no solo demo) con clientes pagando.

## Deploy

Ya está conectado a Vercel (proyecto `hispaniarum`, deploy automático en
cada push a `main`). El build (`vercel-build`) corre, en este orden:
`prisma generate` → `prisma db push` (sincroniza el esquema con Neon,
seguro porque no usamos migraciones aún) → `npm run db:seed` (siembra el
catálogo solo si la tabla de cursos está vacía, y crea el admin si no
existe) → `next build`.

Variables de entorno ya configuradas en Vercel (Production + Preview):
`DATABASE_URL`, `DATABASE_URL_UNPOOLED` (Neon), `AUTH_SECRET`,
`ADMIN_EMAIL`, `ADMIN_PASSWORD`.

Para desplegar manualmente desde este directorio:

```bash
npx vercel --prod
```
