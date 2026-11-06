import type { Course } from "@/app/data/courses";

// Los cursos de ejemplo originales no tienen los campos de canal/venta nuevos.
type SampleCourse = Omit<
  Course,
  "channel" | "published" | "isFree" | "lessonsCount" | "audience" | "includes" | "bonuses" | "faqs"
>;

// Catálogo inicial: se inserta en la base de datos vía `npm run db:seed`.
// Después de la migración a la base de datos, el catálogo real se edita
// desde /admin/cursos — este archivo ya no se lee en tiempo de ejecución.
// Cursos de ejemplo de la demo inicial. Ya no se siembran: solo se usan sus slugs
// para ocultarlos (published=false) cuando entra el catálogo real.
export const seedCourses: SampleCourse[] = [
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
    color: "#D62828",
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
    color: "#00B8D9",
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
    color: "#0071BC",
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
    color: "#D62828",
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
    color: "#D62828",
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
    color: "#0B2A47",
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
    color: "#0071BC",
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

// ---------------------------------------------------------------------------
// Catálogo real de INGENIUMAN. Fuente: https://ingeniuman-telecom.netlify.app
// (landing del curso en Hotmart). Se inserta solo si el slug aún no existe, así
// nunca pisa lo que se edite después desde /admin/cursos.
// ---------------------------------------------------------------------------

const HOTMART_CHECKOUT = "https://pay.hotmart.com/P107933213W";

export const realCourses: Course[] = [
  {
    slug: "mantenimiento-inteligente-telecom",
    title: "Mantenimiento Inteligente Telecom",
    shortDescription:
      "Pasa de apagar incendios a anticipar fallas: mantenimiento predictivo, IA, KPIs y lenguaje gerencial para redes de telecomunicaciones.",
    description:
      "El método que usan los equipos de operación y mantenimiento para que una radiobase, un shelter o un data center no se caigan: mantenimiento predictivo, IA, KPIs y lenguaje gerencial. En 10 módulos, a tu ritmo y con certificado.\n\nCreado por ingenieros de INGENIUMAN que mantienen redes de misión crítica: el curso nace del trabajo en campo, no de la teoría.",
    categorySlug: "telecomunicaciones",
    instructorSlug: "equipo-ingeniuman",
    level: "Todos los niveles",
    price: 49,
    rating: 0,
    reviewsCount: 0,
    studentsCount: 0,
    durationHours: 0,
    color: "#0071BC",
    certType: "empresarial",
    featured: true,
    whatYouWillLearn: [
      "Anticipar fallas con mantenimiento predictivo e inteligencia artificial",
      "Entender la arquitectura de datos: IIoT, edge, cloud y flujo de datos",
      "Aplicar el marco normativo: ISO 55000, ISO 13374 e IEC 62443",
      "Medir el desempeño con KPIs de mantenimiento: MTBF y MTTR",
      "Justificar presupuesto ante gerencia con CAPEX y OPEX",
      "Aplicar mantenimiento seguro y sostenible, incluido LOTO",
    ],
    requirements: [],
    modules: [
      { part: "Parte I · Técnica e IA", title: "Fundamentos y evolución estratégica del mantenimiento", lessons: [] },
      { part: "Parte I · Técnica e IA", title: "Inteligencia artificial aplicada al mantenimiento", lessons: [] },
      { part: "Parte I · Técnica e IA", title: "Arquitectura técnica: IIoT, edge, cloud y flujo de datos", lessons: [] },
      { part: "Parte I · Técnica e IA", title: "El futuro: mantenimiento prescriptivo", lessons: [] },
      { part: "Parte I · Técnica e IA", title: "Marco normativo: ISO 55000, ISO 13374 e IEC 62443", lessons: [] },
      { part: "Parte II · Gestión y personas", title: "Cimientos de gestión: KPIs MTBF y MTTR", lessons: [] },
      { part: "Parte II · Gestión y personas", title: "Justificación de negocio: CAPEX y OPEX", lessons: [] },
      { part: "Parte II · Gestión y personas", title: "La paradoja de los datos (síndrome DRIP)", lessons: [] },
      { part: "Parte II · Gestión y personas", title: "Talento humano: perfiles 4.0 y gestión del cambio", lessons: [] },
      { part: "Parte II · Gestión y personas", title: "Mantenimiento sostenible y seguro: residuos y LOTO", lessons: [] },
    ],
    channel: "hotmart",
    published: true,
    isFree: false,
    checkoutUrl: HOTMART_CHECKOUT,
    teamCheckoutUrl: `${HOTMART_CHECKOUT}?off=wyjydr6l`,
    teamSeats: 5,
    teamPrice: 199,
    productUrl: "https://go.hotmart.com/P107933213W?dp=1",
    freeClassSlug: "plan-contingencia-energetica-telecom",
    guaranteeDays: 7,
    lessonsCount: 24,
    audience: [
      "Técnico de campo — Deja de solo reparar. Radiobases, energía, fibra o transmisión: aprende a anticipar fallas y conviértete en técnico híbrido.",
      "Supervisor o ingeniero O&M — Habla el idioma de gerencia. MTBF, MTTR, CAPEX, OPEX e ISO 55000 para justificar presupuesto y reducir paradas no planificadas.",
      "Estudiante o recién graduado — Destaca en tu CV con un certificado en mantenimiento inteligente e IA aplicada al sector, a tu ritmo y desde cualquier país.",
    ],
    includes: [
      "Curso completo: 10 módulos y 24 lecciones en video",
      "Acceso de por vida en Hotmart, mientras el curso esté disponible",
      "Examen final y certificado de finalización, al completar los módulos y aprobar el examen",
    ],
    bonuses: [
      {
        title: "Kit de 48 láminas descargables en PDF",
        description: "Disponible desde el primer día, para estudiar sin video y repasar en campo.",
        unlock: "inmediato",
      },
      {
        title: "Plantilla de KPIs MTBF y MTTR en Excel",
        description: "Registra fallas y calcula MTBF, MTTR y disponibilidad por sitio.",
        unlock: "examen",
      },
      {
        title: "Checklist LOTO de bloqueo y etiquetado",
        description: "Una página lista para imprimir y usar antes de intervenir.",
        unlock: "examen",
      },
      {
        title: "Guía para justificar mantenimiento ante gerencia",
        description: "CAPEX, OPEX, el costo de una hora caída y un guion para pedir presupuesto.",
        unlock: "examen",
      },
    ],
    faqs: [
      {
        q: "¿Quién enseña el curso?",
        a: "El equipo de ingenieros de INGENIUMAN: casi 15 años como empresa y más de 25 años de experiencia en campo, manteniendo radioenlaces, fibra, energía y data centers de misión crítica.",
      },
      {
        q: "¿Cuánto tiempo necesito?",
        a: "Las lecciones son cortas y el acceso es de por vida. Con una lección al día terminas en un mes.",
      },
      {
        q: "¿Es presencial?",
        a: "No. Es 100% online en Hotmart y lo ves desde el celular o la computadora.",
      },
      {
        q: "¿Qué certificado recibo?",
        a: "Un certificado de finalización de INGENIUMAN Academy al completar los 10 módulos y aprobar el examen. No es una acreditación oficial externa, pero suma a tu CV y a tu perfil de LinkedIn.",
      },
      {
        q: "¿Y si no me gusta?",
        a: "Tienes 7 días de garantía: lo pides en Hotmart y te devuelven tu dinero.",
      },
      {
        q: "¿Cuándo recibo los bonos?",
        a: "El kit de láminas está disponible desde el primer día. La plantilla de KPIs, el checklist LOTO y la guía para gerencia se desbloquean al aprobar el examen final: son tu recompensa por terminar el curso.",
      },
      {
        q: "¿Cómo funciona el plan equipos?",
        a: "Una persona paga los US$199 en Hotmart y recibe su acceso. Luego envía a ventas1@ingeniuman.com los correos de los otros 4 técnicos y les damos acceso al curso, a los bonos y al certificado.",
      },
      {
        q: "¿Cómo accedo a la clase gratuita?",
        a: "Entras al enlace, escribes tu correo y Hotmart te envía un código para ingresar.",
      },
      {
        q: "¿Cómo pago?",
        a: "En la página de pago de Hotmart, con tarjeta, PayPal o los medios disponibles en tu país.",
      },
    ],
  },
  {
    slug: "plan-contingencia-energetica-telecom",
    title: "Plan de contingencia energética para sitios de telecom",
    shortDescription:
      "Clase gratuita: cómo mantener la continuidad del servicio cuando falla la energía.",
    description:
      "Aprende a mantener la continuidad del servicio cuando falla la energía: respaldo, baterías, generación y prioridades de atención.\n\nUn plan de contingencia reacciona a la falla. El mantenimiento inteligente la anticipa. Empieza por esta clase y descubre el siguiente nivel.",
    categorySlug: "telecomunicaciones",
    instructorSlug: "equipo-ingeniuman",
    level: "Todos los niveles",
    price: 0,
    rating: 0,
    reviewsCount: 0,
    studentsCount: 0,
    durationHours: 0,
    color: "#00B8D9",
    certType: "empresarial",
    featured: false,
    whatYouWillLearn: [
      "Respaldo de energía en sitios de telecom",
      "Baterías: qué esperar y cómo cuidarlas",
      "Generación de respaldo",
      "Prioridades de atención cuando falla la energía",
    ],
    requirements: [],
    modules: [],
    channel: "hotmart",
    published: true,
    isFree: true,
    freeAccessUrl:
      "https://hotmart.com/en/club/karen-portlit/products/8680939/content/97BWlm3aOp",
    lessonsCount: 0,
    audience: [],
    includes: [
      "Clase completa en video, sin costo",
      "Acceso con tu correo y un código que te envía Hotmart",
    ],
    bonuses: [],
    faqs: [
      {
        q: "¿Cómo accedo a la clase gratuita?",
        a: "Dejas tu correo aquí, entras al enlace de Hotmart, escribes tu correo de nuevo y Hotmart te envía un código para ingresar.",
      },
    ],
  },
];
