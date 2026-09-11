# Hispaniarum — Portfolio

Portafolio personal construido con [Next.js](https://nextjs.org) y Tailwind CSS,
inspirado en el layout del template **Paperfolio**.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar contenido

Casi todo el texto (nombre, servicios, portafolio, experiencia, testimonios,
artículos) vive en [`app/data/site.ts`](app/data/site.ts) — cámbialo ahí sin
tocar el JSX de las secciones.

Componentes:

- `app/page.tsx` — estructura de la landing (hero, servicios, about, portfolio,
  experiencia, testimonios, artículos, newsletter).
- `app/components/Header.tsx` — navegación superior.
- `app/components/Footer.tsx` — pie de página.
- `app/components/Avatar.tsx` — ilustración de placeholder (reemplázala por
  una foto o ilustración propia).

## Deploy

Importa este repo en [Vercel](https://vercel.com/new) para desplegarlo.
