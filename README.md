# Hispaniarum

Plataforma de capacitación en línea (estilo Coursera / Udemy / Hotmart) para
profesionales y empresas de Ecuador, construida con [Next.js](https://nextjs.org)
y Tailwind CSS. Conserva la identidad visual "paper" (tipografía Onest,
contornos negros, sombras duras, acentos pastel) del prototipo original.

## Funcionalidades incluidas

- **Home** de marketing con propuesta de valor, empresas que confían,
  categorías, cursos destacados, certificaciones, cómo funciona y testimonios.
- **Catálogo de cursos** (`/cursos`) con búsqueda y filtros por categoría y nivel.
- **Ficha de curso** (`/cursos/[slug]`) con temario desplegable, instructor,
  requisitos, curso relacionado y tarjeta de inscripción.
- **Certificaciones** (`/certificaciones`): explica el certificado con aval del
  Ministerio del Trabajo del Ecuador y el certificado empresarial propio.
- **Empresas** (`/empresas`): landing B2B con beneficios, planes por tamaño de
  equipo y formulario de contacto.
- **Precios** (`/precios`): planes Individual / Profesional / Empresas + FAQ.
- **Login / Registro** (`/login`, `/registro`): formularios de acceso (UI,
  sin backend real todavía).
- **Panel del estudiante** (`/dashboard`): cursos en progreso, certificados.
- **Carrito** (`/carrito`): flujo de inscripción/checkout de ejemplo.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar contenido

Todo el contenido vive en `app/data/`:

- `site.ts` — marca, estadísticas del hero, certificaciones, planes,
  testimonios, preguntas frecuentes y enlaces del footer.
- `categories.ts` — categorías del catálogo.
- `courses.ts` — cursos (precio, nivel, tipo de certificado, temario,
  requisitos, qué aprenderás).
- `instructors.ts` — instructores.

Componentes de UI reutilizables en `app/components/ui.tsx`
(`Highlight`, `Tag`, `CertBadge`, `RatingStars`, botones, encabezados de
sección) y tarjetas en `CourseCard.tsx` / `CategoryCard.tsx`.

## Nota sobre certificaciones

Los textos sobre el aval del Ministerio del Trabajo del Ecuador son contenido
de plantilla/marketing. Antes de operar la plataforma en producción, confirma
y formaliza el convenio o proceso real de certificación con la entidad
correspondiente.

## Deploy

Importa este repo en [Vercel](https://vercel.com/new) para desplegarlo.
