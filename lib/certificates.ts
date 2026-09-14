import { prisma } from "@/lib/prisma";
import { getCourse } from "@/app/data/courses";
import { generateCertificateCode } from "@/lib/certificate-code";

/**
 * Emite un certificado para userId+courseSlug si aún no existe uno.
 * Idempotente: seguro de llamar varias veces para el mismo curso.
 */
export async function issueCertificateIfMissing(userId: string, courseSlug: string) {
  const existing = await prisma.certificateIssuance.findFirst({
    where: { userId, courseSlug },
  });
  if (existing) return existing;

  const course = getCourse(courseSlug);
  return prisma.certificateIssuance.create({
    data: {
      code: generateCertificateCode(),
      userId,
      courseSlug,
      certType: course?.certType ?? "empresarial",
    },
  });
}
