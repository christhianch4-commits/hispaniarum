# Hispaniarum

Plataforma de capacitación en línea (estilo Coursera / Udemy / Hotmart) para
profesionales y empresas de Ecuador, construida con [Next.js](https://nextjs.org)
y Tailwind CSS. Conserva la identidad visual "paper" (tipografía Onest,
contornos negros, sombras duras, acentos pastel) del prototipo original.

## Stack

- **Next.js 16** (App Router, Server Actions) + Tailwind CSS 4.
- **Prisma + SQLite** en desarrollo (cero configuración). En producción,
  cambia el `provider` del datasource a `postgresql` y `DATABASE_URL` a tu
  cadena de Postgres (Supabase, Neon, Vercel Postgres...) — los modelos no
  cambian.
- **Auth.js (NextAuth v5)** con proveedor de credenciales (email + contraseña
  con hash bcrypt) y sesión JWT. Rutas bajo `/dashboard` están protegidas por
  `proxy.ts` (antes "middleware").

## Funcionalidades incluidas

- **Home** de marketing, **catálogo de cursos** con filtros, **ficha de
  curso** con temario, **certificaciones** (MDT + empresarial), **empresas**,
  **precios**, **login/registro reales** y **panel del estudiante** con datos
  reales de la base de datos.
- **Carrito → inscripción real**: al finalizar la "compra" (sin pagos todavía)
  se crean registros `Enrollment` reales para el usuario autenticado.
- **Progreso y certificados**: el panel lee `Enrollment`/`CertificateIssuance`
  desde Prisma; un botón de demo ("Continuar (+25%)") simula avance hasta
  completar un curso.

## Desarrollo

```bash
npm install
npx prisma migrate dev   # crea prisma/dev.db con el esquema
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Variables de entorno (`.env`, no se versiona):

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<genera uno con: openssl rand -base64 32>"
```

## Editar contenido

El catálogo (cursos, categorías, instructores, planes, FAQ) vive en
`app/data/` — son datos de plantilla, no vienen de la base de datos.
La base de datos (`prisma/schema.prisma`) solo guarda **usuarios,
matrículas y certificados**, es decir, la actividad real de las personas
que usan la plataforma.

Componentes de UI reutilizables en `app/components/ui.tsx`
(`Highlight`, `Tag`, `CertBadge`, `RatingStars`, botones, encabezados de
sección) y tarjetas en `CourseCard.tsx` / `CategoryCard.tsx`.

## Qué falta para producción

Ver la lista completa de recomendaciones que se discutió con el equipo:
pagos, generación real de certificados en PDF con verificación pública,
panel de administración de cursos, panel de empresa, evaluaciones,
notificaciones transaccionales, facturación electrónica (SRI) y el
convenio real de certificación con el Ministerio del Trabajo del Ecuador.
Los textos actuales sobre ese aval son contenido de marketing/plantilla —
confírmalo y formalízalo antes de operar en producción.

## Deploy

Importa este repo en [Vercel](https://vercel.com/new). Necesitarás:

1. Una base de datos Postgres (Vercel Postgres, Neon o Supabase) — cambia
   el `provider` en `prisma/schema.prisma` a `"postgresql"` y define
   `DATABASE_URL` con esa cadena en las variables de entorno del proyecto.
2. `AUTH_SECRET` como variable de entorno de producción.
3. Ejecutar `npx prisma migrate deploy` contra esa base de datos (una vez).
