import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/queries/courses";
import { getInstructor } from "@/app/data/instructors";
import { buildCertificatePdf } from "@/lib/certificate-pdf";
import type { CertType } from "@/app/data/courses";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const certificate = await prisma.certificateIssuance.findUnique({
    where: { code },
    include: { user: true },
  });

  if (!certificate) {
    return NextResponse.json({ error: "Certificado no encontrado" }, { status: 404 });
  }

  const course = await getCourse(certificate.courseSlug);
  const instructor = course ? getInstructor(course.instructorSlug) : undefined;
  const verifyUrl = new URL(`/verificar/${certificate.code}`, req.nextUrl.origin).toString();

  const pdfBytes = await buildCertificatePdf({
    studentName: certificate.user.name,
    courseTitle: course?.title ?? certificate.courseSlug,
    instructorName: instructor?.name ?? "Hispaniarum",
    durationHours: course?.durationHours ?? 0,
    certType: certificate.certType as CertType,
    code: certificate.code,
    issuedAt: certificate.issuedAt,
    verifyUrl,
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificado-${certificate.code}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
