import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import { seedCourses } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.course.count();
  if (existing > 0) {
    console.log(`Ya hay ${existing} cursos en la base de datos — no se vuelve a sembrar.`);
    return;
  }

  for (const course of seedCourses) {
    await prisma.course.create({
      data: {
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
        modules: {
          create: course.modules.map((mod, mIndex) => ({
            title: mod.title,
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
      },
    });
    console.log(`✓ ${course.title}`);
  }

  console.log(`\n${seedCourses.length} cursos insertados.`);

  // Cuenta admin: nunca hardcodeada (este script vive en un repo público).
  // Usa ADMIN_EMAIL/ADMIN_PASSWORD si están definidas (recomendado en
  // producción); si no, genera una contraseña aleatoria y la imprime una
  // sola vez — cámbiala después de tu primer ingreso.
  const bcrypt = await import("bcryptjs");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@hispaniarum.com";
  const adminPassword = process.env.ADMIN_PASSWORD || randomBytes(9).toString("base64url");

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin Hispaniarum",
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
