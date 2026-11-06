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
  part: string | null;
  lessons: { title: string; duration: string; free: boolean }[];
};

const CHANNELS = ["hotmart", "propio", "regulado"];

function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Una línea por bono: "Título | descripción | examen" (o "inmediato"). */
function parseBonuses(value: FormDataEntryValue | null) {
  return parseListField(value).map((line) => {
    const [title, description, unlock] = line.split("|").map((p) => p.trim());
    return {
      title: title || "",
      description: description || "",
      unlock: (unlock || "").toLowerCase().startsWith("exam") ? "examen" : "inmediato",
    };
  }).filter((b) => b.title);
}

/** Una línea por pregunta: "Pregunta | Respuesta". */
function parseFaqs(value: FormDataEntryValue | null) {
  return parseListField(value).map((line) => {
    const idx = line.indexOf("|");
    if (idx === -1) return { q: line, a: "" };
    return { q: line.slice(0, idx).trim(), a: line.slice(idx + 1).trim() };
  }).filter((f) => f.q && f.a);
}

function optionalText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text ? text : null;
}

function optionalNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
}

function parseModulesField(value: FormDataEntryValue | null): ModuleInput[] {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m && typeof m.title === "string" && m.title.trim())
      .map((m) => ({
        title: m.title.trim(),
        part: typeof m.part === "string" && m.part.trim() ? m.part.trim() : null,
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

  const channelRaw = String(formData.get("channel") || "propio");
  const isFree = formData.get("isFree") === "on";

  return {
    slug,
    title: String(formData.get("title") || "").trim(),
    shortDescription: String(formData.get("shortDescription") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    categorySlug: String(formData.get("categorySlug") || "").trim(),
    instructorSlug: String(formData.get("instructorSlug") || "").trim(),
    level: String(formData.get("level") || "Todos los niveles").trim(),
    price: isFree ? 0 : Number(formData.get("price") || 0),
    oldPrice: formData.get("oldPrice") ? Number(formData.get("oldPrice")) : null,
    durationHours: Number(formData.get("durationHours") || 0),
    color: String(formData.get("color") || "#0071BC").trim(),
    certType: String(formData.get("certType") || "empresarial").trim(),
    featured: formData.get("featured") === "on",
    whatYouWillLearn: JSON.stringify(parseListField(formData.get("whatYouWillLearn"))),
    requirements: JSON.stringify(parseListField(formData.get("requirements"))),

    channel: CHANNELS.includes(channelRaw) ? channelRaw : "propio",
    published: formData.get("published") === "on",
    isFree,
    checkoutUrl: optionalText(formData.get("checkoutUrl")),
    teamCheckoutUrl: optionalText(formData.get("teamCheckoutUrl")),
    teamSeats: optionalNumber(formData.get("teamSeats")),
    teamPrice: optionalNumber(formData.get("teamPrice")),
    productUrl: optionalText(formData.get("productUrl")),
    freeAccessUrl: optionalText(formData.get("freeAccessUrl")),
    freeClassSlug: optionalText(formData.get("freeClassSlug")),
    guaranteeDays: optionalNumber(formData.get("guaranteeDays")),
    lessonsCount: optionalNumber(formData.get("lessonsCount")) ?? 0,
    audience: JSON.stringify(parseListField(formData.get("audience"))),
    includes: JSON.stringify(parseListField(formData.get("includes"))),
    bonuses: JSON.stringify(parseBonuses(formData.get("bonuses"))),
    faqs: JSON.stringify(parseFaqs(formData.get("faqs"))),
  };
}

function modulesCreate(modules: ModuleInput[]) {
  return modules.map((mod, mIndex) => ({
    title: mod.title,
    part: mod.part,
    order: mIndex,
    lessons: {
      create: mod.lessons.map((lesson, lIndex) => ({
        title: lesson.title,
        duration: lesson.duration,
        free: lesson.free,
        order: lIndex,
      })),
    },
  }));
}

function validate(data: ReturnType<typeof courseDataFromForm>): string | null {
  if (!data.slug || !data.title) return "El título y el slug son obligatorios.";
  if (data.channel === "hotmart" && !data.isFree && !data.checkoutUrl) {
    return "Un curso de Hotmart de pago necesita el enlace de checkout.";
  }
  if (data.isFree && !data.freeAccessUrl) {
    return "Una clase gratuita necesita el enlace de acceso (el que se entrega tras dejar el correo).";
  }
  if (data.teamCheckoutUrl && (!data.teamPrice || !data.teamSeats)) {
    return "El plan equipos necesita precio total y número de cupos.";
  }
  return null;
}

function revalidateCatalog(slug: string) {
  revalidatePath("/admin/cursos");
  revalidatePath("/cursos/" + slug);
  revalidatePath("/cursos");
  revalidatePath("/");
}

export async function createCourseAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const data = courseDataFromForm(formData);
  const problem = validate(data);
  if (problem) return { error: problem };

  const existing = await prisma.course.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return { error: 'Ya existe un curso con el slug "' + data.slug + '".' };
  }

  const modules = parseModulesField(formData.get("modulesJson"));

  await prisma.course.create({
    data: { ...data, modules: { create: modulesCreate(modules) } },
  });

  revalidateCatalog(data.slug);
  redirect("/admin/cursos");
}

export async function updateCourseAction(
  courseId: string,
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const data = courseDataFromForm(formData);
  const problem = validate(data);
  if (problem) return { error: problem };

  const conflict = await prisma.course.findFirst({
    where: { slug: data.slug, NOT: { id: courseId } },
  });
  if (conflict) {
    return { error: 'Ya existe otro curso con el slug "' + data.slug + '".' };
  }

  const modules = parseModulesField(formData.get("modulesJson"));

  await prisma.$transaction([
    prisma.courseModule.deleteMany({ where: { courseId } }),
    prisma.course.update({
      where: { id: courseId },
      data: { ...data, modules: { create: modulesCreate(modules) } },
    }),
  ]);

  revalidateCatalog(data.slug);
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
      error:
        "No se puede eliminar: " +
        enrollmentCount +
        " estudiante(s) están inscritos en este curso. Puedes ocultarlo desmarcando «Publicado».",
    };
  }

  await prisma.course.delete({ where: { id: courseId } });

  revalidateCatalog(course.slug);
  return { ok: true as const };
}
