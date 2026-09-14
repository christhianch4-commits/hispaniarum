import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CertBadge, Highlight, PrimaryButton, SectionHeading } from "@/app/components/ui";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/queries/courses";
import { getInstructor } from "@/app/data/instructors";
import type { CertType } from "@/app/data/courses";

export const metadata: Metadata = {
  title: "Verificar certificado | Hispaniarum",
};

export default async function VerificarCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decoded = decodeURIComponent(code).trim().toUpperCase();

  const certificate = await prisma.certificateIssuance.findUnique({
    where: { code: decoded },
    include: { user: true },
  });

  const course = certificate ? await getCourse(certificate.courseSlug) : undefined;
  const instructor = course ? getInstructor(course.instructorSlug) : undefined;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <SectionHeading
          eyebrow="Verificación pública"
          title={
            certificate ? (
              <>
                Certificado <Highlight color="#16A34A">válido</Highlight>
              </>
            ) : (
              <>
                Certificado <Highlight color="#FF4A60">no encontrado</Highlight>
              </>
            )
          }
        />

        <div className="mt-10 paper-card p-8">
          {certificate && course ? (
            <>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#16A34A]">
                <span className="text-lg">✓</span> Este certificado es
                auténtico
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-black/40">
                    Otorgado a
                  </p>
                  <p className="text-lg font-bold">{certificate.user.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-black/40">
                    Curso
                  </p>
                  <p className="font-medium">{course.title}</p>
                </div>
                {instructor && (
                  <div>
                    <p className="text-xs font-semibold uppercase text-black/40">
                      Instructor
                    </p>
                    <p className="font-medium">{instructor.name}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-black/40">
                      Emitido el
                    </p>
                    <p className="font-medium">
                      {certificate.issuedAt.toLocaleDateString("es-EC", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-black/40">
                      Duración
                    </p>
                    <p className="font-medium">{course.durationHours} horas</p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-black/40">
                    Tipo de certificado
                  </p>
                  <CertBadge type={certificate.certType as CertType} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-black/40">
                    Código
                  </p>
                  <p className="font-mono font-medium">{certificate.code}</p>
                </div>
              </div>

              <div className="mt-8">
                <PrimaryButton href={`/certificados/${certificate.code}/pdf`}>
                  Ver / descargar PDF
                </PrimaryButton>
              </div>
            </>
          ) : (
            <>
              <p className="text-black/60">
                No encontramos ningún certificado con el código{" "}
                <span className="font-mono font-semibold">{decoded}</span>.
                Revisa que esté bien escrito o vuelve a intentarlo.
              </p>
              <div className="mt-6">
                <Link
                  href="/verificar"
                  className="paper-btn inline-block border-2 border-black px-6 py-3 text-sm"
                >
                  Intentar con otro código
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
