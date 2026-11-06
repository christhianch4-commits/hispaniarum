export type Instructor = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarBg: string;
  avatarShirt: string;
  /** Estadísticas opcionales: solo se muestran si son reales. */
  studentsCount?: number;
  coursesCount?: number;
  rating?: number;
};

export const instructors: Instructor[] = [
  {
    slug: "equipo-ingeniuman",
    name: "Equipo INGENIUMAN",
    role: "Ingenieros de campo en redes de misión crítica",
    bio: "El equipo de ingenieros de INGENIUMAN: casi 15 años como empresa y más de 25 años de experiencia en campo, manteniendo radioenlaces, fibra, energía y data centers de misión crítica.",
    avatarBg: "#0071BC",
    avatarShirt: "#FFC224",
  },
  {
    slug: "maria-fernanda-lopez",
    name: "María Fernanda López",
    role: "Especialista en Seguridad Ocupacional",
    bio: "Ingeniera en Seguridad e Higiene del Trabajo con más de 12 años auditando sistemas de gestión SART para empresas industriales en Ecuador.",
    avatarBg: "#FFC224",
    avatarShirt: "#D62828",
    studentsCount: 8400,
    coursesCount: 4,
    rating: 4.9,
  },
  {
    slug: "carlos-andres-reyes",
    name: "Carlos Andrés Reyes",
    role: "Consultor en Liderazgo Organizacional",
    bio: "MBA y coach certificado. Ha capacitado equipos directivos en más de 60 empresas de Ecuador, Colombia y Perú.",
    avatarBg: "#00B8D9",
    avatarShirt: "#FFC224",
    studentsCount: 6200,
    coursesCount: 3,
    rating: 4.8,
  },
  {
    slug: "gabriela-suarez",
    name: "Gabriela Suárez",
    role: "Directora de Experiencia al Cliente",
    bio: "Más de 10 años liderando áreas de servicio al cliente en banca y retail. Apasionada por la formación práctica.",
    avatarBg: "#0071BC",
    avatarShirt: "#FFC224",
    studentsCount: 5100,
    coursesCount: 3,
    rating: 4.9,
  },
  {
    slug: "jorge-luis-paredes",
    name: "Jorge Luis Paredes",
    role: "Contador Público y Docente Universitario",
    bio: "Contador CPA con experiencia en finanzas corporativas. Enseña a equipos no financieros a leer y usar los números del negocio.",
    avatarBg: "#16A34A",
    avatarShirt: "#0B2A47",
    studentsCount: 3900,
    coursesCount: 2,
    rating: 4.7,
  },
  {
    slug: "daniela-ortiz",
    name: "Daniela Ortiz",
    role: "HR Business Partner",
    bio: "Psicóloga organizacional especializada en selección, clima y cultura. Ha trabajado en procesos de certificación de talento humano.",
    avatarBg: "#D62828",
    avatarShirt: "#FFC224",
    studentsCount: 4700,
    coursesCount: 3,
    rating: 4.8,
  },
];

export function getInstructor(slug: string) {
  return instructors.find((i) => i.slug === slug);
}
