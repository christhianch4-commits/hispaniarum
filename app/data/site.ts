// Contenido editable de la plataforma. Ajusta estos valores para
// personalizar textos, planes, testimonios y preguntas frecuentes.

export const brand = {
  name: "Hispaniarum",
  tagline: "Capacítate. Certifícate. Crece.",
  description:
    "La plataforma de capacitación en línea para profesionales y empresas de Ecuador. Cursos prácticos, certificados con validez y seguimiento del progreso real.",
  email: "hola@hispaniarum.com",
  phone: "+593 99 000 0000",
};

export const heroStats = [
  { value: "40+", label: "cursos disponibles" },
  { value: "12.000+", label: "estudiantes activos" },
  { value: "180+", label: "empresas capacitadas" },
  { value: "4.8/5", label: "calificación promedio" },
];

export const certifications = [
  {
    title: "Certificado avalado ante el Ministerio del Trabajo",
    color: "#16A34A",
    description:
      "Cursos alineados a los procesos de capacitación reconocidos por el Ministerio del Trabajo del Ecuador, ideales para cumplir horas de capacitación obligatoria y auditorías SART.",
    bullets: [
      "Válido para procesos de auditoría e inspección laboral",
      "Código de verificación único por certificado",
      "Respaldo del programa formativo y su contenido",
    ],
  },
  {
    title: "Certificado empresarial Hispaniarum",
    color: "#2F81F7",
    description:
      "Certificación propia de la plataforma, pensada para reforzar el currículum profesional y demostrar competencias adquiridas ante cualquier empleador.",
    bullets: [
      "Descargable en PDF con código QR de verificación",
      "Incluye horas académicas y calificación final",
      "Compartible directamente en LinkedIn",
    ],
  },
];

export const plans = [
  {
    name: "Individual",
    price: "$14.90",
    period: "/ mes",
    description: "Para profesionales que quieren avanzar a su propio ritmo.",
    features: [
      "Acceso a todo el catálogo de cursos",
      "Certificados empresariales incluidos",
      "Seguimiento de progreso y notas",
      "Cancela cuando quieras",
    ],
    highlighted: false,
  },
  {
    name: "Profesional",
    price: "$24.90",
    period: "/ mes",
    description: "Incluye certificación avalada ante el Ministerio del Trabajo.",
    features: [
      "Todo lo del plan Individual",
      "Certificados con aval del Ministerio del Trabajo",
      "Rutas de aprendizaje guiadas",
      "Soporte prioritario",
    ],
    highlighted: true,
  },
  {
    name: "Empresas",
    price: "Personalizado",
    period: "",
    description: "Capacita a todo tu equipo con reportes centralizados.",
    features: [
      "Panel administrativo por empresa",
      "Reportes de avance y cumplimiento",
      "Certificados empresariales y MDT",
      "Ejecutivo de cuenta dedicado",
    ],
    highlighted: false,
  },
];

export const companyLogos = [
  "Banco Andino",
  "Grupo Litoral",
  "Ferretería Nacional",
  "Aseguradora Confianza",
  "Distribuidora Andes",
  "Textiles del Pacífico",
];

export const testimonials = [
  {
    quote:
      "Certificamos a todo nuestro personal operativo en seguridad ocupacional en menos de un mes. El seguimiento del avance por empresa nos ahorró muchísimo tiempo.",
    author: "Paola Jiménez",
    role: "Jefa de Talento Humano, Grupo Litoral",
  },
  {
    quote:
      "El curso de liderazgo cambió la forma en que dirijo a mi equipo. Contenido práctico, nada de relleno, y el certificado quedó perfecto en mi LinkedIn.",
    author: "Diego Montalvo",
    role: "Coordinador de Operaciones",
  },
  {
    quote:
      "Como pyme necesitábamos cumplir con la capacitación obligatoria sin complicarnos. Hispaniarum nos dio el certificado avalado y todo el respaldo documental.",
    author: "Andrea Salazar",
    role: "Gerente General, Ferretería Nacional",
  },
];

export const faqs = [
  {
    question: "¿Los certificados tienen validez oficial?",
    answer:
      "Los cursos marcados con el sello del Ministerio del Trabajo emiten un certificado con código de verificación, alineado a los procesos de capacitación reconocidos por esa entidad. Los demás cursos emiten un certificado empresarial propio de Hispaniarum, válido como respaldo de horas de formación.",
  },
  {
    question: "¿Puedo capacitar a todo mi equipo desde una sola cuenta?",
    answer:
      "Sí. El plan Empresas incluye un panel administrativo donde puedes inscribir colaboradores, asignar cursos y descargar reportes de avance y certificación por persona.",
  },
  {
    question: "¿Los cursos tienen fecha límite?",
    answer:
      "No. Puedes avanzar a tu propio ritmo mientras tu suscripción esté activa. El progreso queda guardado y puedes retomar cualquier curso cuando quieras.",
  },
  {
    question: "¿Qué pasa si mi empresa necesita un curso a medida?",
    answer:
      "Contáctanos desde la sección Empresas. Diseñamos programas de capacitación a medida junto a nuestros instructores para necesidades específicas de tu industria.",
  },
];

export const footerLinks = {
  plataforma: [
    { label: "Explorar cursos", href: "/cursos" },
    { label: "Categorías", href: "/cursos" },
    { label: "Certificaciones", href: "/certificaciones" },
    { label: "Precios", href: "/precios" },
  ],
  empresas: [
    { label: "Capacitación corporativa", href: "/empresas" },
    { label: "Certificado MDT", href: "/certificaciones" },
    { label: "Hablar con ventas", href: "/empresas#contacto" },
  ],
  soporte: [
    { label: "Preguntas frecuentes", href: "/precios#faq" },
    { label: "Iniciar sesión", href: "/login" },
    { label: "Crear cuenta", href: "/registro" },
  ],
};
