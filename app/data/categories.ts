export type Category = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
};

export const categories: Category[] = [
  // Áreas de ingeniería de INGENIUMAN
  {
    slug: "telecomunicaciones",
    name: "Telecomunicaciones",
    icon: "📡",
    color: "#0071BC",
    description: "Radiobases, fibra, energía y data centers de misión crítica.",
  },
  {
    slug: "petroleos",
    name: "Petróleos",
    icon: "🛢️",
    color: "#0B2A47",
    description: "Ingeniería, instrumentación y mantenimiento para operaciones petroleras.",
  },
  {
    slug: "electrica",
    name: "Eléctrica",
    icon: "⚡",
    color: "#FFC224",
    description: "Generación, tableros, puesta a tierra y control industrial.",
  },
  {
    slug: "civil",
    name: "Civil",
    icon: "🏗️",
    color: "#16A34A",
    description: "Estructuras, obras civiles y mantenimiento de infraestructura.",
  },
  {
    slug: "mecanica",
    name: "Mecánica",
    icon: "⚙️",
    color: "#00B8D9",
    description: "Montaje electromecánico, estructuras metálicas y sistemas contra incendios.",
  },
  // Categorías generales
  {
    slug: "seguridad-ocupacional",
    name: "Seguridad y Salud Ocupacional",
    icon: "🦺",
    color: "#D62828",
    description: "Prevención de riesgos laborales y normativa SART.",
  },
  {
    slug: "liderazgo-gestion",
    name: "Liderazgo y Gestión de Equipos",
    icon: "🧭",
    color: "#00B8D9",
    description: "Habilidades directivas para equipos de alto rendimiento.",
  },
  {
    slug: "atencion-cliente",
    name: "Atención al Cliente",
    icon: "💬",
    color: "#0071BC",
    description: "Experiencia de cliente y servicio de excelencia.",
  },
  {
    slug: "ventas-marketing",
    name: "Ventas y Marketing",
    icon: "📈",
    color: "#FFC224",
    description: "Estrategia comercial y marketing digital.",
  },
  {
    slug: "finanzas-contabilidad",
    name: "Finanzas y Contabilidad",
    icon: "💰",
    color: "#16A34A",
    description: "Finanzas para no financieros y control de gestión.",
  },
  {
    slug: "recursos-humanos",
    name: "Recursos Humanos",
    icon: "🤝",
    color: "#D62828",
    description: "Gestión del talento, selección y clima laboral.",
  },
  {
    slug: "tecnologia",
    name: "Tecnología y Software",
    icon: "💻",
    color: "#0B2A47",
    description: "Herramientas digitales, datos y desarrollo web.",
  },
  {
    slug: "desarrollo-personal",
    name: "Desarrollo Personal",
    icon: "🌱",
    color: "#0071BC",
    description: "Productividad, comunicación e inteligencia emocional.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
