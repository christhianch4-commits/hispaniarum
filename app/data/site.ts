// Contenido editable de la plataforma. Ajusta estos valores para
// personalizar textos, planes y preguntas frecuentes.
//
// Regla: aquí solo va información verificable del cliente. No agregar cifras,
// logos de clientes ni testimonios hasta contar con datos y permisos reales.

export const brand = {
  name: "INGENIUACADEMY",
  tagline: "Capacitación técnica por INGENIUMAN",
  description:
    "Capacitación técnica para profesionales y empresas, creada por ingenieros con más de 25 años de experiencia en campo. Certificados verificables en línea.",
  email: "ventas@ingeniuman.com",
  phone: "+593 98 841 9215",
  whatsapp: "https://wa.me/593988419215",
};

// Empresa que respalda la academia (datos de https://www.ingeniuman.com/es/).
export const parent = {
  name: "INGENIUMAN",
  url: "https://www.ingeniuman.com/es/",
  summary:
    "Empresa ecuatoriana de ingeniería y mantenimiento, con más de 25 años de experiencia de sus ingenieros en sistemas críticos para empresas nacionales y multinacionales.",
  areas: [
    "Telecomunicaciones",
    "Petróleos",
    "Eléctrica",
    "Civil",
    "Mecánica",
  ],
};

export const heroStats = [
  { value: "25+", label: "años de experiencia de nuestros ingenieros" },
  { value: "5", label: "áreas de ingeniería" },
  { value: "100%", label: "certificados verificables en línea" },
];

export const certifications = [
  {
    title: "Cursos con certificación del Ministerio del Trabajo",
    color: "#16A34A",
    description:
      "Algunos programas siguen el proceso de certificación del Ministerio del Trabajo del Ecuador. La ficha de cada curso indica si lo incluye.",
    bullets: [
      "Se indica de forma clara en cada curso",
      "Código de verificación único por certificado",
      "Registro de participantes y calificaciones",
    ],
  },
  {
    title: "Certificado de finalización INGENIUACADEMY",
    color: "#0071BC",
    description:
      "Certificado propio de la academia para los cursos que no pasan por una certificación oficial. Demuestra las horas y competencias adquiridas.",
    bullets: [
      "Descargable en PDF con código QR de verificación",
      "Incluye horas académicas y nombre del instructor",
      "Cualquier empresa puede comprobar su autenticidad en línea",
    ],
  },
];

// `cta` define a dónde lleva el botón de cada plan.
export const plans = [
  {
    name: "Curso individual",
    price: "Según el curso",
    period: "",
    description: "Compra solo el curso que necesitas, con su certificado.",
    features: [
      "El precio se indica en cada curso",
      "Certificado verificable en línea",
      "Material y recursos del curso",
      "Soporte del equipo de INGENIUMAN",
    ],
    highlighted: false,
    cta: { label: "Ver cursos", href: "/cursos" },
  },
  {
    name: "Plan equipos",
    price: "Desde 5 técnicos",
    period: "",
    description: "Cupos corporativos para capacitar a tu equipo de campo.",
    features: [
      "Cupos para 5 o más técnicos",
      "Cada técnico recibe su acceso y su certificado",
      "Precio por persona menor al individual",
      "Atención directa con el equipo comercial",
    ],
    highlighted: true,
    cta: { label: "Solicitar cotización", href: "/empresas#contacto" },
  },
  {
    name: "A la medida",
    price: "Cotización",
    period: "",
    description: "Programas diseñados para la operación de tu empresa.",
    features: [
      "Contenido adaptado a tu industria y equipos",
      "Impartido por ingenieros de INGENIUMAN",
      "Modalidad en línea, en vivo o presencial",
      "Certificado para cada participante",
    ],
    highlighted: false,
    cta: { label: "Hablar con ventas", href: "/empresas#contacto" },
  },
];

export const faqs = [
  {
    question: "¿Los certificados tienen validez oficial?",
    answer:
      "Depende del curso. Los programas que cuentan con certificación del Ministerio del Trabajo lo indican en su ficha. Los demás emiten un certificado de finalización de INGENIUACADEMY, con código QR y verificación pública en línea.",
  },
  {
    question: "¿Puedo capacitar a todo mi equipo?",
    answer:
      "Sí. Con el plan equipos compras cupos para 5 o más técnicos y cada uno recibe su propio acceso y certificado. Si necesitas más personas o un contenido distinto, escríbenos desde la sección Empresas.",
  },
  {
    question: "¿Cómo funcionan los horarios y plazos?",
    answer:
      "Los cursos grabados puedes tomarlos a tu ritmo. Los cursos en vivo tienen fechas definidas, que se indican en la ficha de cada programa.",
  },
  {
    question: "¿Pueden diseñar un curso a la medida de mi empresa?",
    answer:
      "Sí. Nuestro equipo de ingenieros puede preparar un programa específico para tu industria, tus equipos y tus procedimientos. Cuéntanos tu necesidad y te enviamos una propuesta.",
  },
];

export const footerLinks = {
  plataforma: [
    { label: "Explorar cursos", href: "/cursos" },
    { label: "Categorías", href: "/cursos" },
    { label: "Certificaciones", href: "/certificaciones" },
    { label: "Verificar certificado", href: "/verificar" },
    { label: "Precios", href: "/precios" },
  ],
  empresas: [
    { label: "Capacitación corporativa", href: "/empresas" },
    { label: "Certificaciones", href: "/certificaciones" },
    { label: "Hablar con ventas", href: "/empresas#contacto" },
  ],
  soporte: [
    { label: "Preguntas frecuentes", href: "/precios#faq" },
    { label: "Iniciar sesión", href: "/login" },
    { label: "Crear cuenta", href: "/registro" },
  ],
};
