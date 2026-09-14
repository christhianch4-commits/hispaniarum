"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type AdminFormState = { error?: string } | undefined;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return session;
}

type ModuleInput = {
  title: string;
  lessons: { title: string; duration: string; free: boolean }[];
};

function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseModulesField(value: FormDataEntryValue | null): ModuleInput[] {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m && typeof m.title === "string" && m.title.trim())
      .map((m) => ({
        title: m.title.trim(),
        lessons: Array.isArray(m.lessons)
          ? m.lessons
              .filter((l: { title?: string }) => l && typeof l.title === "string" && l.title.trim())
              .map((l: { title: string; duration?: string; free?: boolean }) => ({
                title: l.title.trim(),
                duration: (l.duration ?? "").trim() || "10 min",
                free: !!l.free,
              }))
          : [],
      }));
  } catch {
    return [];
  }
}

function courseDataFromForm(formData: FormData) {
  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    slug,
    title: String(formData.get("title") || "").trim(),
    shortDescription: String(formData.get("shortDescription") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    categorySlug: String(formData.get("categorySlug") || "").trim(),
    instructorSlug: String(formData.get("instructorSlug") || "").trim(),
    level: String(formData.get("level") || "Principiante").trim(),
    price: Number(formData.get("price") || 0),
    oldPrice: formData.get("oldPrice") ? Number(formData.get("oldPrice")) : null,
    durationHours: Number(formData.get("durationHours") || 0),
    color: String(formData.get("color") || "#2F81F7").trim(),
    certType: String(formData.get("certType") || "empresarial").trim(),
    featured: formData.get("featured") === "on",
    whatYouWillLearn: JSON.stringify(parseListField(formData.get("whatYouWillLearn"))),
    requirements: JSON.stringify(parseListField(formData.get("requirements"))),
  };
}

export async function createCourseAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const data = courseDataFromForm(formData);
  if (!data.slug || !data.title) {
    return { error: "El título y el slug son obligatorios." };
  }

  const existing = await prisma.course.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return { error: `Ya existe un curso con el slug "${data.slug}".` };
  }

  const modules = parseModulesField(formData.get("modulesJson"));

  await prisma.course.create({
    data: {
      ...data,
      modules: {
        create: modules.map((mod, mIndex) => ({
          title: mod.title,
          order: mIndex,
          lessons: {
            create: mod.lessons.map((lesson, lIndex) => ({
              title: lesson.title,
              duration: lesson.duration,
              free: lesson.free,
              order: lIndex,
            })),
          },
        })),
      },
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function updateCourseAction(
  courseId: string,
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const data = courseDataFromForm(formData);
  if (!data.slug || !data.title) {
    return { error: "El título y el slug son obligatorios." };
  }

  const conflict = await prisma.course.findFirst({
    where: { slug: data.slug, NOT: { id: courseId } },
  });
  if (conflict) {
    return { error: `Ya existe otro curso con el slug "${data.slug}".` };
  }

  const modules = parseModulesField(formData.get("modulesJson"));

  await prisma.$transaction([
    prisma.courseModule.deleteMany({ where: { courseId } }),
    prisma.course.update({
      where: { id: courseId },
      data: {
        ...data,
        modules: {
          create: modules.map((mod, mIndex) => ({
            title: mod.title,
            order: mIndex,
            lessons: {
              create: mod.lessons.map((lesson, lIndex) => ({
                title: lesson.title,
                duration: lesson.duration,
                free: lesson.free,
                order: lIndex,
              })),
            },
          })),
        },
      },
    }),
  ]);

  revalidatePath("/admin/cursos");
  revalidatePath(`/cursos/${data.slug}`);
  revalidatePath("/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function deleteCourseAction(courseId: string) {
  await requireAdmin();

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return { error: "Curso no encontrado." };

  const enrollmentCount = await prisma.enrollment.count({
    where: { courseSlug: course.slug },
  });
  if (enrollmentCount > 0) {
    return {
      error: `No se puede eliminar: ${enrollmentCount} estudiante(s) están inscritos en este curso.`,
    };
  }

  await prisma.course.delete({ where: { id: courseId } });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  revalidatePath("/");
  return { ok: true as const };
}
