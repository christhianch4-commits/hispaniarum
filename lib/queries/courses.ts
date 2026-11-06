import { prisma } from "@/lib/prisma";
import type {
  Bonus,
  CertType,
  Channel,
  Course,
  Faq,
  Level,
  Module,
} from "@/app/data/courses";

export type CourseWithId = Course & { id: string };

const courseWithModules = {
  include: {
    modules: {
      orderBy: { order: "asc" as const },
      include: { lessons: { orderBy: { order: "asc" as const } } },
    },
  },
};

type CourseRow = NonNullable<Awaited<ReturnType<typeof fetchOneRaw>>>;

async function fetchOneRaw(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    ...courseWithModules,
  });
}

// Cursos sembrados antes del rebrand guardan colores de la paleta anterior.
// Se traducen al leer; los cursos nuevos ya usan la paleta INGENIUACADEMY.
const LEGACY_COLORS: Record<string, string> = {
  "#FF6B7A": "#D62828",
  "#FF4A60": "#D62828",
  "#2F81F7": "#0071BC",
  "#6366F1": "#00B8D9",
  "#0A0A0A": "#0B2A47",
};

function brandColor(color: string) {
  return LEGACY_COLORS[color.toUpperCase()] ?? color;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function parseStringArray(value: string): string[] {
  const parsed = parseJson<unknown>(value, []);
  return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
}

function mapCourse(row: CourseRow): CourseWithId {
  const modules: Module[] = row.modules.map((m) => ({
    title: m.title,
    part: m.part ?? undefined,
    lessons: m.lessons.map((l) => ({
      title: l.title,
      duration: l.duration,
      free: l.free,
    })),
  }));

  const bonuses = parseJson<Bonus[]>(row.bonuses, []);
  const faqs = parseJson<Faq[]>(row.faqs, []);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.shortDescription,
    description: row.description,
    categorySlug: row.categorySlug,
    instructorSlug: row.instructorSlug,
    level: row.level as Level,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    studentsCount: row.studentsCount,
    durationHours: row.durationHours,
    color: brandColor(row.color),
    certType: row.certType as CertType,
    featured: row.featured,
    whatYouWillLearn: parseStringArray(row.whatYouWillLearn),
    requirements: parseStringArray(row.requirements),
    modules,
    channel: row.channel as Channel,
    published: row.published,
    isFree: row.isFree,
    checkoutUrl: row.checkoutUrl ?? undefined,
    teamCheckoutUrl: row.teamCheckoutUrl ?? undefined,
    teamSeats: row.teamSeats ?? undefined,
    teamPrice: row.teamPrice ?? undefined,
    productUrl: row.productUrl ?? undefined,
    freeAccessUrl: row.freeAccessUrl ?? undefined,
    freeClassSlug: row.freeClassSlug ?? undefined,
    guaranteeDays: row.guaranteeDays ?? undefined,
    lessonsCount: row.lessonsCount,
    audience: parseStringArray(row.audience),
    includes: parseStringArray(row.includes),
    bonuses: Array.isArray(bonuses) ? bonuses : [],
    faqs: Array.isArray(faqs) ? faqs : [],
  };
}

/**
 * Listado público: solo cursos publicados. El panel de admin y el panel del
 * estudiante (que debe seguir mostrando matrículas de cursos ya ocultos)
 * piden `includeUnpublished`.
 */
export async function getAllCourses(
  opts: { includeUnpublished?: boolean } = {}
): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: opts.includeUnpublished ? undefined : { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

/** Por slug, sin filtrar por publicado (certificados, verificación y matrículas). */
export async function getCourse(slug: string): Promise<CourseWithId | undefined> {
  const row = await fetchOneRaw(slug);
  return row ? mapCourse(row) : undefined;
}

export async function getCourseById(id: string): Promise<CourseWithId | undefined> {
  const row = await prisma.course.findUnique({ where: { id }, ...courseWithModules });
  return row ? mapCourse(row) : undefined;
}

export async function getCoursesByCategory(categorySlug: string): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { categorySlug, published: true },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

export async function getFeaturedCourses(): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { featured: true, published: true },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

/** Clases gratuitas publicadas (captación de leads). */
export async function getFreeCourses(): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { isFree: true, published: true },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

/** Curso de pago que continúa a una clase gratuita (para el "siguiente nivel"). */
export async function getCourseForFreeClass(freeSlug: string): Promise<CourseWithId | undefined> {
  const row = await prisma.course.findFirst({
    where: { freeClassSlug: freeSlug, published: true },
    ...courseWithModules,
  });
  return row ? mapCourse(row) : undefined;
}

export async function getRelatedCourses(
  course: Pick<Course, "slug" | "categorySlug">,
  limit = 3
): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { categorySlug: course.categorySlug, slug: { not: course.slug }, published: true },
    take: limit,
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}
