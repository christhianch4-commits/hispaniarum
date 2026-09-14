import type { Course } from "@/app/data/courses";

// Catálogo inicial: se inserta en la base de datos vía `npm run db:seed`.
// Después de la migración a la base de datos, el catálogo real se edita
// desde /admin/cursos — este archivo ya no se lee en tiempo de ejecución.
export const seedCourses: Course[] = [
  {
    slug: "seguridad-salud-ocupacional-sart",
    title: "Seguridad y Salud Ocupacional: Fundamentos SART",
    shortDescription:
      "Implementa el Sistema de Auditoría de Riesgos del Trabajo en tu empresa paso a paso.",
    description:
      "Aprende a diagnosticar, implementar y auditar un sistema de gestión de seguridad y salud en el trabajo alineado a la normativa ecuatoriana. Curso práctico con casos reales de industria, comercio y servicios.",
    categorySlug: "seguridad-ocupacional",
    instructorSlug: "maria-fernanda-lopez",
    level: "Intermedio",
    price: 45,
    oldPrice: 89,
    rating: 4.9,
    reviewsCount: 612,
    studentsCount: 8400,
    durationHours: 18,
    color: "#FF6B7A",
    certType: "mdt",
    featured: true,
    whatYouWillLearn: [
      "Estructura y requisitos del Sistema de Gestión SART",
      "Identificación y matriz de riesgos laborales",
      "Elaboración del reglamento interno de seguridad",
      "Preparación para auditorías del IESS",
    ],
    requirements: [
      "No se requiere experiencia previa",
      "Recomendado para responsables de RRHH, SSO o gerencia",
    ],
    modules: [
      {
        title: "Introducción al marco legal ecuatoriano",
        lessons: [
          { title: "Panorama de la normativa SART", duration: "12 min", free: true },
          { title: "Roles y responsabilidades legales", duration: "15 min" },
        ],
      },
      {
        title: "Identificación y evaluación de riesgos",
        lessons: [
          { title: "Matriz de riesgos laborales", duration: "20 min" },
          { title: "Métodos de evaluación cualitativa", duration: "18 min" },
        ],
      },
      {
        title: "Implementación y auditoría",
        lessons: [
          { title: "Plan de acción preventivo", duration: "22 min" },
          { title: "Simulacro de auditoría SART", duration: "25 min" },
        ],
      },
    ],
  },
  {
    slug: "liderazgo-equipos-alto-rendimiento",
    title: "Liderazgo de Equipos de Alto Rendimiento",
    shortDescription:
      "Herramientas prácticas para liderar, motivar y desarrollar equipos que logran resultados.",
    description:
      "Un programa diseñado para líderes y futuros líderes que necesitan pasar de gestionar tareas a inspirar personas. Incluye modelos de feedback, delegación y manejo de conflictos.",
    categorySlug: "liderazgo-gestion",
    instructorSlug: "carlos-andres-reyes",
    level: "Intermedio",
    price: 39,
    oldPrice: 69,
    rating: 4.8,
    reviewsCount: 405,
    studentsCount: 6200,
    durationHours: 14,
    color: "#6366F1",
    certType: "empresarial",
    featured: true,
    whatYouWillLearn: [
      "Estilos de liderazgo situacional",
      "Feedback efectivo y conversaciones difíciles",
      "Delegación y gestión por objetivos",
      "Construcción de confianza en equipos remotos",
    ],
    requirements: [
      "Dirigido a jefes, supervisores y coordinadores",
      "No requiere conocimientos previos",
    ],
    modules: [
      {
        title: "Fundamentos del liderazgo",
        lessons: [
          { title: "De jefe a líder", duration: "14 min", free: true },
          { title: "Autoconocimiento y estilo propio", duration: "16 min" },
        ],
      },
      {
        title: "Comunicación y feedback",
        lessons: [
          { title: "Modelo de feedback SBI", duration: "18 min" },
          { title: "Conversaciones difíciles", duration: "20 min" },
        ],
      },
      {
        title: "Gestión de equipos",
        lessons: [
          { title: "Delegación efectiva", duration: "17 min" },
          { title: "Manejo de conflictos", duration: "19 min" },
        ],
      },
    ],
  },
  {
    slug: "atencion-cliente-excelencia",
    title: "Atención al Cliente de Excelencia",
    shortDescription:
      "Convierte cada interacción con el cliente en una experiencia memorable.",
    description:
      "Curso orientado a equipos de servicio, ventas y soporte que buscan elevar la calidad de atención presencial, telefónica y digital, con protocolos aplicables desde el primer día.",
    categorySlug: "atencion-cliente",
    instructorSlug: "gabriela-suarez",
    level: "Principiante",
    price: 29,
    oldPrice: 49,
    rating: 4.9,
    reviewsCount: 530,
    studentsCount: 5100,
    durationHours: 10,
    color: "#2F81F7",
    certType: "empresarial",
    featured: true,
    whatYouWillLearn: [
      "Protocolos de atención presencial y telefónica",
      "Manejo de clientes difíciles y quejas",
      "Atención al cliente en redes y chat",
      "Medición de satisfacción (NPS y CSAT)",
    ],
    requirements: ["Ideal para equipos de servicio, ventas y soporte"],
    modules: [
      {
        title: "Fundamentos del servicio",
        lessons: [
          { title: "Qué es una experiencia memorable", duration: "10 min", free: true },
          { title: "Momentos de verdad", duration: "12 min" },
        ],
      },
      {
        title: "Manejo de situaciones difíciles",
        lessons: [
          { title: "Clientes molestos: técnica LAST", duration: "15 min" },
          { title: "Quejas y reclamos", duration: "14 min" },
        ],
      },
      {
        title: "Atención digital",
        lessons: [
          { title: "Tono de voz en redes y chat", duration: "13 min" },
          { title: "Medición: NPS y CSAT", duration: "11 min" },
        ],
      },
    ],
  },
  {
    slug: "marketing-digital-emprendedores",
    title: "Marketing Digital para Emprendedores",
    shortDescription:
      "Estrategia, contenido y publicidad digital para hacer crecer tu negocio.",
    description:
      "Aprende a construir una estrategia de marketing digital de principio a fin: definición de audiencia, contenido, redes sociales y campañas pagadas con presupuestos reales de pyme.",
    categorySlug: "ventas-marketing",
    instructorSlug: "gabriela-suarez",
    level: "Principiante",
    price: 35,
    oldPrice: 59,
    rating: 4.7,
    reviewsCount: 289,
    studentsCount: 4300,
    durationHours: 16,
    color: "#FFC224",
    certType: "empresarial",
    whatYouWillLearn: [
      "Definición de buyer persona y propuesta de valor",
      "Plan de contenidos para redes sociales",
      "Fundamentos de campañas en Meta y Google Ads",
      "Métricas clave para medir resultados",
    ],
    requirements: ["No se requiere experiencia previa en marketing"],
    modules: [
      {
        title: "Estrategia",
        lessons: [
          { title: "Buyer persona y propuesta de valor", duration: "15 min", free: true },
          { title: "Embudo de conversión", duration: "13 min" },
        ],
      },
      {
        title: "Contenido y redes",
        lessons: [
          { title: "Calendario de contenidos", duration: "16 min" },
          { title: "Formatos que funcionan en 2024", duration: "14 min" },
        ],
      },
      {
        title: "Publicidad paga",
        lessons: [
          { title: "Primeros pasos en Meta Ads", duration: "18 min" },
          { title: "Primeros pasos en Google Ads", duration: "17 min" },
        ],
      },
    ],
  },
  {
    slug: "finanzas-para-no-financieros",
    title: "Finanzas para no Financieros",
    shortDescription:
      "Entiende los estados financieros y toma mejores decisiones de negocio.",
    description:
      "Pensado para líderes de áreas no financieras que necesitan interpretar balances, estados de resultados y flujo de caja para tomar decisiones informadas.",
    categorySlug: "finanzas-contabilidad",
    instructorSlug: "jorge-luis-paredes",
    level: "Intermedio",
    price: 39,
    oldPrice: 65,
    rating: 4.7,
    reviewsCount: 198,
    studentsCount: 3900,
    durationHours: 12,
    color: "#16A34A",
    certType: "empresarial",
    whatYouWillLearn: [
      "Lectura de estados financieros",
      "Indicadores clave de rentabilidad y liquidez",
      "Elaboración de presupuestos por área",
      "Flujo de caja y capital de trabajo",
    ],
    requirements: ["No requiere conocimientos contables previos"],
    modules: [
      {
        title: "Estados financieros",
        lessons: [
          { title: "Balance general explicado", duration: "16 min", free: true },
          { title: "Estado de resultados", duration: "15 min" },
        ],
      },
      {
        title: "Indicadores",
        lessons: [
          { title: "Rentabilidad y liquidez", duration: "14 min" },
          { title: "Punto de equilibrio", duration: "13 min" },
        ],
      },
      {
        title: "Planeación financiera",
        lessons: [
          { title: "Presupuesto por área", duration: "17 min" },
          { title: "Flujo de caja proyectado", duration: "18 min" },
        ],
      },
    ],
  },
  {
    slug: "prevencion-riesgos-laborales",
    title: "Prevención de Riesgos Laborales",
    shortDescription:
      "Certifica a tu personal en prevención de riesgos según normativa vigente.",
    description:
      "Curso orientado a todo el personal operativo y administrativo para identificar peligros, actuar ante emergencias y cumplir con la normativa de prevención de riesgos laborales.",
    categorySlug: "seguridad-ocupacional",
    instructorSlug: "maria-fernanda-lopez",
    level: "Principiante",
    price: 25,
    oldPrice: 39,
    rating: 4.8,
    reviewsCount: 740,
    studentsCount: 9600,
    durationHours: 8,
    color: "#FF4A60",
    certType: "mdt",
    featured: true,
    whatYouWillLearn: [
      "Identificación de peligros en el puesto de trabajo",
      "Uso correcto de equipo de protección personal",
      "Procedimientos ante emergencias",
      "Derechos y obligaciones del trabajador",
    ],
    requirements: ["Dirigido a todo el personal de la empresa"],
    modules: [
      {
        title: "Cultura de prevención",
        lessons: [
          { title: "Por qué la prevención nos protege a todos", duration: "9 min", free: true },
        ],
      },
      {
        title: "Riesgos y protección",
        lessons: [
          { title: "Tipos de riesgo laboral", duration: "12 min" },
          { title: "Equipo de protección personal", duration: "11 min" },
        ],
      },
      {
        title: "Emergencias",
        lessons: [{ title: "Protocolos de evacuación", duration: "13 min" }],
      },
    ],
  },
  {
    slug: "gestion-talento-humano",
    title: "Gestión del Talento Humano",
    shortDescription:
      "Del reclutamiento a la retención: gestiona personas con visión estratégica.",
    description:
      "Recorre todo el ciclo de gestión de talento: reclutamiento, selección, inducción, evaluación de desempeño y planes de retención, con enfoque en pymes ecuatorianas.",
    categorySlug: "recursos-humanos",
    instructorSlug: "daniela-ortiz",
    level: "Intermedio",
    price: 35,
    oldPrice: 55,
    rating: 4.8,
    reviewsCount: 224,
    studentsCount: 4700,
    durationHours: 15,
    color: "#FF4A60",
    certType: "mdt",
    whatYouWillLearn: [
      "Diseño de perfiles de puesto",
      "Entrevistas por competencias",
      "Evaluación de desempeño 90/180/360",
      "Planes de retención y clima laboral",
    ],
    requirements: ["Recomendado para equipos de RRHH y gerencia"],
    modules: [
      {
        title: "Atracción de talento",
        lessons: [
          { title: "Perfil de puesto por competencias", duration: "14 min", free: true },
          { title: "Entrevista estructurada", duration: "16 min" },
        ],
      },
      {
        title: "Desarrollo",
        lessons: [
          { title: "Inducción efectiva", duration: "12 min" },
          { title: "Evaluación de desempeño", duration: "15 min" },
        ],
      },
      {
        title: "Retención",
        lessons: [{ title: "Clima laboral y engagement", duration: "14 min" }],
      },
    ],
  },
  {
    slug: "fundamentos-programacion-web",
    title: "Fundamentos de Programación Web",
    shortDescription:
      "Da tus primeros pasos en desarrollo web con HTML, CSS y JavaScript.",
    description:
      "Un curso introductorio para quienes quieren iniciar en tecnología: construirás tu primer sitio web funcional aplicando buenas prácticas desde el inicio.",
    categorySlug: "tecnologia",
    instructorSlug: "carlos-andres-reyes",
    level: "Principiante",
    price: 29,
    oldPrice: 49,
    rating: 4.6,
    reviewsCount: 156,
    studentsCount: 3100,
    durationHours: 20,
    color: "#0A0A0A",
    certType: "empresarial",
    whatYouWillLearn: [
      "Estructura de una página con HTML5",
      "Estilos y layout responsive con CSS",
      "Interactividad básica con JavaScript",
      "Publicación de tu primer sitio",
    ],
    requirements: ["No se requiere experiencia previa en programación"],
    modules: [
      {
        title: "HTML",
        lessons: [
          { title: "Estructura de un documento HTML", duration: "12 min", free: true },
          { title: "Formularios y semántica", duration: "14 min" },
        ],
      },
      {
        title: "CSS",
        lessons: [
          { title: "Selectores y modelo de caja", duration: "15 min" },
          { title: "Flexbox y Grid", duration: "18 min" },
        ],
      },
      {
        title: "JavaScript",
        lessons: [
          { title: "Variables y eventos", duration: "16 min" },
          { title: "Manipulación del DOM", duration: "17 min" },
        ],
      },
    ],
  },
  {
    slug: "inteligencia-emocional-productividad",
    title: "Inteligencia Emocional y Productividad",
    shortDescription:
      "Gestiona tus emociones y tu tiempo para rendir mejor sin agotarte.",
    description:
      "Un programa práctico de desarrollo personal para mejorar el autocontrol, la comunicación asertiva y la organización del tiempo en entornos laborales exigentes.",
    categorySlug: "desarrollo-personal",
    instructorSlug: "daniela-ortiz",
    level: "Principiante",
    price: 25,
    oldPrice: 39,
    rating: 4.9,
    reviewsCount: 312,
    studentsCount: 5600,
    durationHours: 9,
    color: "#2F81F7",
    certType: "empresarial",
    whatYouWillLearn: [
      "Autoconocimiento emocional",
      "Comunicación asertiva",
      "Gestión del tiempo y prioridades",
      "Manejo del estrés laboral",
    ],
    requirements: ["Abierto a cualquier persona"],
    modules: [
      {
        title: "Inteligencia emocional",
        lessons: [
          { title: "Las 5 competencias emocionales", duration: "13 min", free: true },
        ],
      },
      {
        title: "Productividad",
        lessons: [
          { title: "Matriz de prioridades", duration: "12 min" },
          { title: "Técnica pomodoro y bloques de foco", duration: "11 min" },
        ],
      },
    ],
  },
];
