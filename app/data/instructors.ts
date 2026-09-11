export type Instructor = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarBg: string;
  avatarShirt: string;
  studentsCount: number;
  coursesCount: number;
  rating: number;
};

export const instructors: Instructor[] = [
  {
    slug: "maria-fernanda-lopez",
    name: "María Fernanda López",
    role: "Especialista en Seguridad Ocupacional",
    bio: "Ingeniera en Seguridad e Higiene del Trabajo con más de 12 años auditando sistemas de gestión SART para empresas industriales en Ecuador.",
    avatarBg: "#FFC224",
    avatarShirt: "#FF6B7A",
    studentsCount: 8400,
    coursesCount: 4,
    rating: 4.9,
  },
  {
    slug: "carlos-andres-reyes",
    name: "Carlos Andrés Reyes",
    role: "Consultor en Liderazgo Organizacional",
    bio: "MBA y coach certificado. Ha capacitado equipos directivos en más de 60 empresas de Ecuador, Colombia y Perú.",
    avatarBg: "#6366F1",
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
    avatarBg: "#2F81F7",
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
    avatarShirt: "#0A0A0A",
    studentsCount: 3900,
    coursesCount: 2,
    rating: 4.7,
  },
  {
    slug: "daniela-ortiz",
    name: "Daniela Ortiz",
    role: "HR Business Partner",
    bio: "Psicóloga organizacional especializada en selección, clima y cultura. Ha trabajado en procesos de certificación de talento humano.",
    avatarBg: "#FF4A60",
    avatarShirt: "#FFC224",
    studentsCount: 4700,
    coursesCount: 3,
    rating: 4.8,
  },
];

export function getInstructor(slug: string) {
  return instructors.find((i) => i.slug === slug);
}
