import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CourseCard from "@/app/components/CourseCard";
import { CertBadge, PrimaryButton, RatingStars, Tag } from "@/app/components/ui";
import { courses, getCourse, getRelatedCourses } from "@/app/data/courses";
import { getCategory } from "@/app/data/categories";
import { getInstructor } from "@/app/data/instructors";
import CurriculumAccordion from "./CurriculumAccordion";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} | Hispaniarum`,
    description: course.shortDescription,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const category = getCategory(course.categorySlug);
  const instructor = getInstructor(course.instructorSlug);
  const related = getRelatedCourses(course);

  return (
    <>
      <Header />

      <main>
        {/* Cabecera del curso */}
        <section
          className="border-b-2 border-black"
          style={{ backgroundColor: course.color }}
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1.6fr_1fr] md:items-start">
            <div>
              {category && <Tag tone="light">{category.name}</Tag>}
              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-xl text-black/70">
                {course.shortDescription}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <RatingStars
                  rating={course.rating}
                  reviewsCount={course.reviewsCount}
                />
                <span className="text-sm text-black/60">
                  {course.studentsCount.toLocaleString("es-EC")} estudiantes
                </span>
                <span className="text-sm text-black/60">
                  {course.durationHours} h de contenido
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <CertBadge type={course.certType} />
                <Tag tone="light">{course.level}</Tag>
              </div>

              {instructor && (
                <p className="mt-6 text-sm text-black/70">
                  Dictado por{" "}
                  <span className="font-bold">{instructor.name}</span> —{" "}
                  {instructor.role}
                </p>
              )}
            </div>

            {/* Tarjeta de inscripción */}
            <div className="paper-card p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">
                  ${course.price}
                </span>
                {course.oldPrice && (
                  <span className="text-black/40 line-through">
                    ${course.oldPrice}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-black/50">
                Acceso incluido con el plan Profesional
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <PrimaryButton href="/carrito" className="text-center">
                  Inscribirme ahora
                </PrimaryButton>
                <button className="paper-btn border-2 border-black px-6 py-3 text-sm">
                  Agregar al carrito
                </button>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-black/70">
                <li className="flex gap-2">
                  <span>✓</span> Acceso de por vida al contenido
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Certificado al finalizar
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Material descargable
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Soporte de instructor
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr]">
          <div>
            {/* Qué aprenderás */}
            <section>
              <h2 className="text-xl font-extrabold">Lo que aprenderás</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 rounded-xl border-2 border-black/10 p-3 text-sm"
                  >
                    <span className="text-black/40">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Descripción */}
            <section className="mt-12">
              <h2 className="text-xl font-extrabold">Descripción del curso</h2>
              <p className="mt-4 text-black/70">{course.description}</p>
            </section>

            {/* Temario */}
            <section className="mt-12">
              <h2 className="text-xl font-extrabold">Contenido del curso</h2>
              <p className="mt-2 text-sm text-black/50">
                {course.modules.length} módulos ·{" "}
                {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}{" "}
                clases · {course.durationHours} horas
              </p>
              <div className="mt-4">
                <CurriculumAccordion modules={course.modules} />
              </div>
            </section>

            {/* Requisitos */}
            <section className="mt-12">
              <h2 className="text-xl font-extrabold">Requisitos</h2>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {course.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-black/40">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Instructor */}
          {instructor && (
            <aside className="h-fit">
              <div className="paper-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                  Tu instructor
                </h3>
                <p className="mt-3 font-bold">{instructor.name}</p>
                <p className="text-sm text-black/60">{instructor.role}</p>
                <p className="mt-3 text-sm text-black/70">{instructor.bio}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/10 pt-4 text-center text-xs">
                  <div>
                    <p className="font-bold">{instructor.rating}</p>
                    <p className="text-black/50">rating</p>
                  </div>
                  <div>
                    <p className="font-bold">{instructor.coursesCount}</p>
                    <p className="text-black/50">cursos</p>
                  </div>
                  <div>
                    <p className="font-bold">
                      {Math.round(instructor.studentsCount / 100) / 10}k
                    </p>
                    <p className="text-black/50">estudiantes</p>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-20">
            <h2 className="text-xl font-extrabold">También te puede interesar</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
