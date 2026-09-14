// Tipos del catálogo de cursos. El catálogo en sí ya no vive aquí: se
// gestiona desde /admin/cursos y se lee de la base de datos a través de
// lib/queries/courses.ts. (El contenido inicial de ejemplo está en
// prisma/seed-data.ts, usado solo por `npm run db:seed`.)

export type CertType = "mdt" | "empresarial" | "ambos";

export type Lesson = {
  title: string;
  duration: string;
  free?: boolean;
};

export type Module = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  instructorSlug: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  durationHours: number;
  color: string;
  certType: CertType;
  featured?: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  modules: Module[];
};
