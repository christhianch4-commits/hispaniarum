import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import { realCourses, seedCourses } from "./seed-data";
import type { Course } from "../app/data/courses";

const prisma = new PrismaClient();

function courseData(course: Course) {
  return {
    slug: course.slug,
    title: course.title,
    shortDescription: course.shortDescription,
    description: course.description,
    categorySlug: course.categorySlug,
    instructorSlug: course.instructorSlug,
    level: course.level,
    price: course.price,
    oldPrice: course.oldPrice,
    rating: course.rating,
    reviewsCount: course.reviewsCount,
    studentsCount: course.studentsCount,
    durationHours: course.durationHours,
    color: course.color,
    certType: course.certType,
    featured: course.featured ?? false,
    whatYouWillLearn: JSON.stringify(course.whatYouWillLearn),
    requirements: JSON.stringify(course.requirements),
    channel: course.channel,
    published: course.published,
    isFree: course.isFree,
    checkoutUrl: course.checkoutUrl,
    teamCheckoutUrl: course.teamCheckoutUrl,
    teamSeats: course.teamSeats,
    teamPrice: course.teamPrice,
    productUrl: course.productUrl,
    freeAccessUrl: course.freeAccessUrl,
    freeClassSlug: course.freeClassSlug,
    guaranteeDays: course.guaranteeDays,
    lessonsCount: course.lessonsCount,
    audience: JSON.stringify(course.audience),
    includes: JSON.stringify(course.includes),
    bonuses: JSON.stringify(course.bonuses),
    faqs: JSON.stringify(course.faqs),
    modules: {
      create: course.modules.map((mod, mIndex) => ({
        title: mod.title,
        part: mod.part,
        order: mIndex,
        lessons: {
          create: mod.lessons.map((lesson, lIndex) => ({
            title: lesson.title,
            duration: lesson.duration,
            free: lesson.free ?? false,
            order: lIndex,
          })),
        },
      })),
    },
  };
}

async function main() {
  // 1) Catálogo real: se crea solo si el slug no existe (nunca pisa ediciones del admin).
  let createdAny = false;
  for (const course of realCourses) {
    const exists = await prisma.course.findUnique({ where: { slug: course.slug } });
    if (exists) continue;
    await prisma.course.create({ data: courseData(course) });
    createdAny = true;
    console.log(`✓ Curso creado: ${course.title}`);
  }

  // 2) Al entrar el catálogo real por primera vez, los cursos de ejemplo de la
  //    demo se ocultan (no se borran: pueden tener matrículas y certificados).
  if (createdAny) {
    const hidden = await prisma.course.updateMany({
      where: { slug: { in: seedCourses.map((c) => c.slug) }, published: true },
      data: { published: false, featured: false },
    });
    if (hidden.count > 0) console.log(`Ocultados ${hidden.count} cursos de ejemplo.`);
  }

  // 3) Cuenta admin: nunca hardcodeada (este script vive en un repo público).
  //    Usa ADMIN_EMAIL/ADMIN_PASSWORD si están definidas (recomendado); si no,
  //    genera una contraseña aleatoria y la imprime una sola vez.
  const bcrypt = await import("bcryptjs");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@hispaniarum.com";
  const adminPassword = process.env.ADMIN_PASSWORD || randomBytes(9).toString("base64url");

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin INGENIUACADEMY",
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "ADMIN",
      },
    });
    console.log(`\nCuenta admin creada: ${adminEmail} / ${adminPassword}`);
    console.log("Guarda esta contraseña ahora — no se vuelve a mostrar.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
