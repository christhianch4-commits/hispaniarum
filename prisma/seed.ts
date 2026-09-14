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

  // Cuenta admin de demo (cambia la contraseña después de probar).
  const bcrypt = await import("bcryptjs");
  const adminEmail = "admin@hispaniarum.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin Hispaniarum",
        email: adminEmail,
        passwordHash: await bcrypt.hash("admin123456", 10),
        role: "ADMIN",
      },
    });
    console.log(`\nCuenta admin creada: ${adminEmail} / admin123456`);
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
