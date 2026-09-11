export type Category = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "seguridad-ocupacional",
    name: "Seguridad y Salud Ocupacional",
    icon: "🦺",
    color: "#FF6B7A",
    description: "Prevención de riesgos laborales y normativa SART.",
  },
  {
    slug: "liderazgo-gestion",
    name: "Liderazgo y Gestión de Equipos",
    icon: "🧭",
    color: "#6366F1",
    description: "Habilidades directivas para equipos de alto rendimiento.",
  },
  {
    slug: "atencion-cliente",
    name: "Atención al Cliente",
    icon: "💬",
    color: "#2F81F7",
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
    color: "#FF4A60",
    description: "Gestión del talento, selección y clima laboral.",
  },
  {
    slug: "tecnologia",
    name: "Tecnología y Software",
    icon: "💻",
    color: "#0A0A0A",
    description: "Herramientas digitales, datos y desarrollo web.",
  },
  {
    slug: "desarrollo-personal",
    name: "Desarrollo Personal",
    icon: "🌱",
    color: "#2F81F7",
    description: "Productividad, comunicación e inteligencia emocional.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
