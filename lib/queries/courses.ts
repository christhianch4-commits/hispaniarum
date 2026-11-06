import { prisma } from "@/lib/prisma";
import type { Course, CertType, Module } from "@/app/data/courses";

export type CourseWithId = Course & { id: string };

const courseWithModules = {
  include: {
    modules: {
      orderBy: { order: "asc" as const },
      include: { lessons: { orderBy: { order: "asc" as const } } },
    },
  },
};

type CourseRow = Awaited<ReturnType<typeof fetchOneRaw>>;

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

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapCourse(row: NonNullable<CourseRow>): CourseWithId {
  const modules: Module[] = row.modules.map((m) => ({
    title: m.title,
    lessons: m.lessons.map((l) => ({
      title: l.title,
      duration: l.duration,
      free: l.free,
    })),
  }));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.shortDescription,
    description: row.description,
    categorySlug: row.categorySlug,
    instructorSlug: row.instructorSlug,
    level: row.level as Course["level"],
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    studentsCount: row.studentsCount,
    durationHours: row.durationHours,
    color: brandColor(row.color),
    certType: row.certType as CertType,
    featured: row.featured,
    whatYouWillLearn: parseJsonArray(row.whatYouWillLearn),
    requirements: parseJsonArray(row.requirements),
    modules,
  };
}

export async function getAllCourses(): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

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
    where: { categorySlug },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

export async function getFeaturedCourses(): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { featured: true },
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}

export async function getRelatedCourses(
  course: Pick<Course, "slug" | "categorySlug">,
  limit = 3
): Promise<CourseWithId[]> {
  const rows = await prisma.course.findMany({
    where: { categorySlug: course.categorySlug, slug: { not: course.slug } },
    take: limit,
    ...courseWithModules,
  });
  return rows.map(mapCourse);
}
