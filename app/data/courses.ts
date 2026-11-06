// Tipos del catálogo de cursos. El catálogo en sí vive en la base de datos y
// se gestiona desde /admin/cursos (lectura en lib/queries/courses.ts). El
// contenido inicial está en prisma/seed-data.ts (solo lo usa `npm run db:seed`).

export type CertType = "mdt" | "empresarial" | "ambos";

/** Quién vende y entrega el curso. */
export type Channel = "hotmart" | "propio" | "regulado";

export const channelLabels: Record<Channel, string> = {
  hotmart: "Hotmart",
  propio: "Plataforma propia",
  regulado: "Regulado (Ministerio del Trabajo)",
};

export type Level = "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";

export type Lesson = {
  title: string;
  duration: string;
  free?: boolean;
};

export type Module = {
  title: string;
  /** Agrupación opcional, p. ej. "Parte I · Técnica e IA". */
  part?: string;
  lessons: Lesson[];
};

export type Bonus = {
  title: string;
  description: string;
  /** "inmediato" = disponible desde el día 1; "examen" = se desbloquea al aprobar el examen. */
  unlock: "inmediato" | "examen";
};

export type Faq = { q: string; a: string };

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  instructorSlug: string;
  level: Level;
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

  // Canal de entrega y venta
  channel: Channel;
  published: boolean;
  isFree: boolean;
  checkoutUrl?: string;
  teamCheckoutUrl?: string;
  teamSeats?: number;
  teamPrice?: number;
  productUrl?: string;
  freeAccessUrl?: string;
  freeClassSlug?: string;
  guaranteeDays?: number;
  lessonsCount: number;

  // Contenido de venta
  audience: string[];
  includes: string[];
  bonuses: Bonus[];
  faqs: Faq[];
};
