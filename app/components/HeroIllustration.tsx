type HeroIllustrationProps = {
  className?: string;
};

/**
 * Ilustración del hero: una persona avanzando un curso desde su tablet,
 * rodeada de los temas típicos de la plataforma (analítica, diseño,
 * código, idiomas/negocios, lectura, alianzas empresariales).
 */
export default function HeroIllustration({ className = "" }: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Persona avanzando un curso en su tablet, rodeada de íconos de capacitación"
    >
      <rect width="400" height="400" rx="28" fill="#FFC224" />

      {/* Órbita punteada */}
      <ellipse
        cx="205"
        cy="175"
        rx="150"
        ry="118"
        fill="none"
        stroke="#00000030"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      {/* --- Íconos orbitando --- */}

      {/* Gráfico de crecimiento (arriba-izquierda) */}
      <g transform="translate(56,96)">
        <rect x="-30" y="-28" width="60" height="56" rx="12" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />
        <rect x="-18" y="-2" width="8" height="16" rx="2" fill="#6366F1" />
        <rect x="-4" y="-10" width="8" height="24" rx="2" fill="#6366F1" />
        <rect x="10" y="-18" width="8" height="32" rx="2" fill="#16A34A" />
        <path d="M-20 -12 L-2 -22 L14 -26" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 -26 L14 -26 L14 -20" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Paleta de diseño (arriba-centro) */}
      <g transform="translate(178,54)">
        <rect x="-28" y="-24" width="56" height="48" rx="12" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />
        <path
          d="M0 -12c9 0 16 6 16 13 0 5-4 6-8 6-2 0-3 1-3 3 0 3 3 3 3 6 0 3-3 5-8 5-11 0-19-8-19-17 0-9 8-16 19-16z"
          fill="#FF6B7A"
          stroke="#0a0a0a"
          strokeWidth="1.6"
        />
        <circle cx="-8" cy="-6" r="2.6" fill="#2F81F7" />
        <circle cx="2" cy="-9" r="2.6" fill="#FFC224" />
        <circle cx="9" cy="-2" r="2.6" fill="#16A34A" />
        <circle cx="-6" cy="4" r="2.6" fill="#6366F1" />
      </g>

      {/* Código / tecnología (arriba-derecha) */}
      <g transform="translate(300,80)">
        <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#0a0a0a" />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="18"
          fontWeight="700"
          fill="#ffffff"
        >
          {"</>"}
        </text>
      </g>

      {/* Globo / idiomas y negocios internacionales (derecha) */}
      <g transform="translate(346,168)">
        <rect x="-28" y="-28" width="56" height="56" rx="14" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="17" fill="#2F81F7" stroke="#0a0a0a" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="7" ry="17" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M-17 -5 H17" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M-17 5 H17" stroke="#ffffff" strokeWidth="1.6" />
      </g>

      {/* Libros + manzana (izquierda) */}
      <g transform="translate(58,232)">
        <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />
        <rect x="-18" y="6" width="36" height="9" rx="2" fill="#6366F1" stroke="#0a0a0a" strokeWidth="1.4" />
        <rect x="-18" y="-3" width="36" height="9" rx="2" fill="#2F81F7" stroke="#0a0a0a" strokeWidth="1.4" />
        <circle cx="6" cy="-14" r="8" fill="#FF4A60" stroke="#0a0a0a" strokeWidth="1.4" />
        <path d="M6 -22 q4 -4 8 -1" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Alianza / empresas (abajo-derecha) */}
      <g transform="translate(316,262)">
        <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />
        <path d="M-16 2 l10 -8 8 6 10 -8" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-20" y="-2" width="16" height="11" rx="4" fill="#FF6B7A" stroke="#0a0a0a" strokeWidth="1.6" />
        <rect x="4" y="-2" width="16" height="11" rx="4" fill="#2F81F7" stroke="#0a0a0a" strokeWidth="1.6" />
      </g>

      {/* --- Personaje central --- */}
      <g transform="translate(200,236)">
        {/* Cuerpo / suéter con lunares */}
        <path
          d="M-92 118 C-92 46 -46 4 0 4 C46 4 92 46 92 118 Z"
          fill="#FF6B7A"
        />
        <g fill="#FFC224" opacity="0.9">
          <circle cx="-46" cy="70" r="5" />
          <circle cx="-16" cy="98" r="5" />
          <circle cx="20" cy="66" r="5" />
          <circle cx="48" cy="96" r="5" />
          <circle cx="2" cy="46" r="5" />
          <circle cx="-64" cy="102" r="4" />
          <circle cx="62" cy="60" r="4" />
        </g>

        {/* Cuello */}
        <rect x="-16" y="-14" width="32" height="26" rx="10" fill="#e8b48f" />

        {/* Cabeza */}
        <circle cx="0" cy="-58" r="46" fill="#ffe0c2" />
        {/* Cabello */}
        <path
          d="M-46 -60 C-50 -100 -14 -118 0 -118 C16 -118 50 -100 46 -60 C40 -74 30 -86 22 -90 C10 -76 -10 -76 -22 -90 C-30 -86 -40 -74 -46 -60Z"
          fill="#1a1a1a"
        />
        {/* Barba */}
        <path
          d="M-40 -50 C-42 -14 -22 8 0 8 C22 8 42 -14 40 -50 C34 -34 22 -24 0 -24 C-22 -24 -34 -34 -40 -50Z"
          fill="#1a1a1a"
        />
        {/* Cara visible */}
        <path d="M-24 -54 C-24 -34 -14 -20 0 -20 C14 -20 24 -34 24 -54 Z" fill="#ffe0c2" />
        {/* Ojos */}
        <circle cx="-11" cy="-52" r="3.2" fill="#1a1a1a" />
        <circle cx="11" cy="-52" r="3.2" fill="#1a1a1a" />
        {/* Sonrisa */}
        <path d="M-9 -38 Q0 -30 9 -38" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Brazo + mano señalando (derecha) */}
        <path d="M60 40 C90 26 108 4 112 -16" stroke="#FF6B7A" strokeWidth="26" fill="none" strokeLinecap="round" />
        <circle cx="114" cy="-20" r="13" fill="#ffe0c2" />

        {/* Tablet en la otra mano */}
        <rect x="-58" y="18" width="92" height="66" rx="10" fill="#0a0a0a" />
        <rect x="-52" y="24" width="80" height="50" rx="6" fill="#ffffff" />
        <text x="-12" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="#0a0a0a">
          Curso
        </text>
        <text x="20" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="#16A34A">
          79%
        </text>
        <rect x="-46" y="54" width="68" height="8" rx="4" fill="#eee" />
        <rect x="-46" y="54" width="52" height="8" rx="4" fill="#16A34A" />
        <path d="M-64 46 C-78 40 -86 26 -84 8" stroke="#ffe0c2" strokeWidth="20" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
