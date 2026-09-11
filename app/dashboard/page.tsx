import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CertBadge, SectionHeading, Highlight } from "@/app/components/ui";
import { courses } from "@/app/data/courses";

export const metadata: Metadata = {
  title: "Mi panel | Hispaniarum",
};

const inProgress = [
  { course: courses[0], progress: 65 },
  { course: courses[1], progress: 30 },
  { course: courses[2], progress: 90 },
];

const completed = [courses[5], courses[7]];

export default function DashboardPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Mi panel"
          title={
            <>
              Hola de nuevo, sigue{" "}
              <Highlight color="#FF6B7A">avanzando</Highlight>
            </>
          }
          description="Este es un panel de ejemplo: así se vería tu progreso una vez inicies sesión."
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
            <p className="text-2xl font-extrabold">
              {inProgress.reduce((acc, i) => acc + i.course.durationHours, 0)}h
            </p>
            <p className="text-sm text-black/50">de contenido en progreso</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold">Continuar aprendiendo</h2>
          <div className="mt-6 grid gap-4">
            {inProgress.map(({ course, progress }) => (
              <Link
                key={course.slug}
                href={`/cursos/${course.slug}`}
                className="paper-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <span
                  className="h-16 w-16 shrink-0 rounded-2xl border-2 border-black"
                  style={{ backgroundColor: course.color }}
                  aria-hidden
                />
                <div className="flex-1">
                  <p className="font-bold">{course.title}</p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-black/50">
                    {progress}% completado
                  </p>
                </div>
                <span className="paper-btn shrink-0 border-2 border-black px-4 py-2 text-xs">
                  Continuar
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold">Mis certificados</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {completed.map((course) => (
              <div key={course.slug} className="paper-card flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{course.title}</p>
                  <span className="text-xl">🎓</span>
                </div>
                <CertBadge type={course.certType} />
                <button className="paper-btn mt-2 w-fit border-2 border-black px-4 py-2 text-xs">
                  Descargar certificado
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
