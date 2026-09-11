import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CertBadge, Highlight, PrimaryButton, SectionHeading } from "@/app/components/ui";
import { getCourse } from "@/app/data/courses";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AdvanceButton from "./AdvanceButton";

export const metadata: Metadata = {
  title: "Mi panel | Hispaniarum",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const withCourse = enrollments
    .map((e) => ({ enrollment: e, course: getCourse(e.courseSlug) }))
    .filter((e) => e.course);

  const inProgress = withCourse.filter((e) => e.enrollment.progress < 100);
  const completed = withCourse.filter((e) => e.enrollment.progress >= 100);

  const totalHours = inProgress.reduce(
    (acc, e) => acc + (e.course?.durationHours ?? 0),
    0
  );

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Mi panel"
          title={
            <>
              Hola, <Highlight color="#FF6B7A">{session.user.name}</Highlight>
            </>
          }
          description="Este es tu progreso real: se guarda en la base de datos de Hispaniarum."
        />

        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="paper-card p-5">
            <p className="text-2xl font-extrabold">{inProgress.length}</p>
            <p className="text-sm text-black/50">cursos en curso</p>
          </div>
          <div className="paper-card p-5">
            <p className="text-2xl font-extrabold">{completed.length}</p>
            <p className="text-sm text-black/50">certificados obtenidos</p>
          </div>
          <div className="paper-card p-5">
            <p className="text-2xl font-extrabold">{totalHours}h</p>
            <p className="text-sm text-black/50">de contenido en progreso</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold">Continuar aprendiendo</h2>

          {inProgress.length === 0 ? (
            <div className="paper-card mt-6 p-10 text-center">
              <p className="text-3xl">🎓</p>
              <p className="mt-2 font-bold">Aún no tienes cursos en curso</p>
              <p className="mt-1 text-sm text-black/60">
                Explora el catálogo e inscríbete en tu primer curso.
              </p>
              <div className="mt-5">
                <PrimaryButton href="/cursos">Explorar cursos</PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {inProgress.map(({ enrollment, course }) => (
                <div
                  key={enrollment.id}
                  className="paper-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >
                  <Link
                    href={`/cursos/${course!.slug}`}
                    className="h-16 w-16 shrink-0 rounded-2xl border-2 border-black"
                    style={{ backgroundColor: course!.color }}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <Link href={`/cursos/${course!.slug}`} className="font-bold hover:underline">
                      {course!.title}
                    </Link>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-black transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-black/50">
                      {enrollment.progress}% completado
                    </p>
                  </div>
                  <AdvanceButton enrollmentId={enrollment.id} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold">Mis certificados</h2>

          {completed.length === 0 ? (
            <div className="paper-card mt-6 p-6 text-center text-sm text-black/50">
              Cuando completes un curso al 100%, tu certificado aparecerá aquí.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {completed.map(({ enrollment, course }) => (
                <div
                  key={enrollment.id}
                  className="paper-card flex flex-col gap-3 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{course!.title}</p>
                    <span className="text-xl">🎓</span>
                  </div>
                  <CertBadge type={course!.certType} />
                  <button
                    disabled
                    title="Próximamente: descarga en PDF con código de verificación"
                    className="paper-btn mt-2 w-fit cursor-not-allowed border-2 border-black/20 px-4 py-2 text-xs text-black/40"
                  >
                    Descargar certificado (próximamente)
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
