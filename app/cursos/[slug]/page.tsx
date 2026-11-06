import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CourseCard from "@/app/components/CourseCard";
import {
  CertBadge,
  PrimaryButton,
  RatingStars,
  readableText,
} from "@/app/components/ui";
import {
  getCourse,
  getCourseForFreeClass,
  getRelatedCourses,
} from "@/lib/queries/courses";
import { getCategory } from "@/app/data/categories";
import { getInstructor } from "@/app/data/instructors";
import { parent } from "@/app/data/site";
import { formatUsd, hotmartUrl } from "@/lib/hotmart";
import CurriculumAccordion from "./CurriculumAccordion";
import FreeClassForm from "./FreeClassForm";

// Sin generateStaticParams: el catálogo se edita desde /admin/cursos en
// cualquier momento, así que estas páginas se renderizan bajo demanda.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course || !course.published) return {};
  return {
    title: `${course.title} | INGENIUACADEMY`,
    description: course.shortDescription,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  // Los cursos ocultos (borradores o de ejemplo) no se pueden abrir por URL.
  if (!course || !course.published) notFound();

  const category = getCategory(course.categorySlug);
  const instructor = getInstructor(course.instructorSlug);
  const [related, nextLevel] = await Promise.all([
    getRelatedCourses(course),
    course.isFree ? getCourseForFreeClass(course.slug) : Promise.resolve(undefined),
  ]);

  const lessonCount =
    course.lessonsCount || course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const dark = readableText(course.color) === "text-white";
  const bandText = dark ? "text-white" : "text-black";
  const chip = dark ? "bg-white/20 text-white" : "bg-black/10 text-black";
  const isHotmart = course.channel === "hotmart";
  const hasTeamPlan = !!(course.teamCheckoutUrl && course.teamPrice && course.teamSeats);

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
            <div className={bandText}>
              <div className="flex flex-wrap gap-2">
                {category && (
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${chip}`}>
                    {category.name}
                  </span>
                )}
                {course.isFree && (
                  <span className="rounded-md bg-[#FFC224] px-2 py-0.5 text-xs font-bold text-black">
                    Clase gratuita
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-xl opacity-85">{course.shortDescription}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm opacity-90">
                {course.reviewsCount > 0 && (
                  <span className="rounded-full bg-white px-3 py-1 text-black">
                    <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} />
                  </span>
                )}
                {course.studentsCount > 0 && (
                  <span>{course.studentsCount.toLocaleString("es-EC")} estudiantes</span>
                )}
                {course.modules.length > 0 && <span>{course.modules.length} módulos</span>}
                {lessonCount > 0 && <span>{lessonCount} lecciones en video</span>}
                {course.durationHours > 0 && <span>{course.durationHours} h de contenido</span>}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {!course.isFree && <CertBadge type={course.certType} />}
                <span className={`rounded-md px-2 py-1 text-xs font-semibold ${chip}`}>
                  {course.level}
                </span>
              </div>

              {instructor && (
                <p className="mt-6 text-sm opacity-90">
                  Dictado por <span className="font-bold">{instructor.name}</span> —{" "}
                  {instructor.role}
                </p>
              )}
            </div>

            {/* Tarjeta de inscripción */}
            <div className="paper-card p-6 text-black">
              {course.isFree ? (
                <>
                  <p className="text-3xl font-extrabold">Gratis</p>
                  <p className="mt-1 mb-5 text-xs text-black/50">
                    Déjanos tu correo y te damos acceso a la clase.
                  </p>
                  <FreeClassForm courseSlug={course.slug} />
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold">{formatUsd(course.price)}</span>
                    {course.oldPrice && (
                      <span className="text-black/40 line-through">
                        {formatUsd(course.oldPrice)}
                      </span>
                    )}
                    {isHotmart && (
                      <span className="text-xs text-black/50">USD · pago único</span>
                    )}
                  </div>

                  {isHotmart && course.checkoutUrl ? (
                    <div className="mt-5 flex flex-col gap-2">
                      <a
                        href={hotmartUrl(course.checkoutUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="paper-btn block bg-black px-6 py-3 text-center text-sm text-white"
                      >
                        Inscribirme ahora
                      </a>
                      {course.freeClassSlug && (
                        <Link
                          href={`/cursos/${course.freeClassSlug}`}
                          className="paper-btn block border-2 border-black px-6 py-3 text-center text-sm"
                        >
                          Primero quiero ver la clase gratis
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-col gap-2">
                      <PrimaryButton href="/carrito" className="text-center">
                        Inscribirme ahora
                      </PrimaryButton>
                    </div>
                  )}

                  {hasTeamPlan && (
                    <div className="mt-5 rounded-2xl border-2 border-black/10 p-4">
                      <p className="font-bold">
                        Plan equipos · {formatUsd(course.teamPrice!)}
                      </p>
                      <p className="mt-0.5 text-xs text-black/60">
                        {course.teamSeats} técnicos ·{" "}
                        {formatUsd(course.teamPrice! / course.teamSeats!)} por persona. Bonos y
                        certificado para cada uno.
                      </p>
                      <a
                        href={hotmartUrl(course.teamCheckoutUrl!)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="paper-btn mt-3 block border-2 border-black px-4 py-2 text-center text-sm"
                      >
                        Comprar plan equipos
                      </a>
                    </div>
                  )}

                  {isHotmart && (
                    <p className="mt-4 text-xs text-black/50">
                      Pago seguro en Hotmart: tarjeta, PayPal y medios locales según tu país.
                      {course.guaranteeDays
                        ? ` ${course.guaranteeDays} días de garantía: si el curso no es para ti, Hotmart te devuelve tu dinero.`
                        : ""}
                    </p>
                  )}
                </>
              )}

              {course.includes.length > 0 && (
                <ul className="mt-5 space-y-2 border-t border-black/10 pt-5 text-sm text-black/70">
                  {course.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span>✓</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr]">
          <div>
            {/* Para quién es */}
            {course.audience.length > 0 && (
              <section>
                <h2 className="text-xl font-extrabold">Para quién es</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {course.audience.map((item) => {
                    const [title, ...rest] = item.split(" — ");
                    return (
                      <div key={item} className="paper-card p-4">
                        <p className="font-bold">{title}</p>
                        {rest.length > 0 && (
                          <p className="mt-1 text-sm text-black/60">{rest.join(" — ")}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Qué aprenderás */}
            {course.whatYouWillLearn.length > 0 && (
              <section className="mt-12">
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
            )}

            {/* Descripción */}
            <section className="mt-12">
              <h2 className="text-xl font-extrabold">Descripción del curso</h2>
              <div className="mt-4 space-y-3 text-black/70">
                {course.description.split("\n\n").map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            {/* Programa */}
            {course.modules.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-extrabold">Programa</h2>
                <p className="mt-2 text-sm text-black/50">
                  {course.modules.length} módulos
                  {lessonCount > 0 ? ` · ${lessonCount} lecciones` : ""}
                  {course.durationHours > 0 ? ` · ${course.durationHours} horas` : ""}
                </p>
                <div className="mt-4">
                  <CurriculumAccordion modules={course.modules} />
                </div>
              </section>
            )}

            {/* Bonos */}
            {course.bonuses.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-extrabold">Bonos incluidos</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.bonuses.map((bonus) => (
                    <div key={bonus.title} className="paper-card p-4">
                      <p className="font-bold">{bonus.title}</p>
                      <p className="mt-1 text-sm text-black/60">{bonus.description}</p>
                      <p className="mt-3 inline-block rounded-md bg-black/5 px-2 py-0.5 text-xs font-semibold">
                        {bonus.unlock === "examen"
                          ? "Se desbloquea al aprobar el examen final"
                          : "Disponible desde el primer día"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requisitos */}
            {course.requirements.length > 0 && (
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
            )}

            {/* Siguiente nivel (clase gratuita -> curso completo) */}
            {nextLevel && (
              <section className="mt-12">
                <div className="rounded-3xl bg-black p-8 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Siguiente nivel
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold">{nextLevel.title}</h2>
                  <p className="mt-2 max-w-lg text-sm text-white/70">
                    Un plan de contingencia reacciona a la falla; el mantenimiento inteligente
                    la anticipa.
                  </p>
                  <Link
                    href={`/cursos/${nextLevel.slug}`}
                    className="paper-btn mt-5 inline-block bg-white px-6 py-3 text-sm text-black"
                  >
                    Ver el curso completo · {formatUsd(nextLevel.price)}
                  </Link>
                </div>
              </section>
            )}

            {/* Preguntas frecuentes */}
            {course.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-extrabold">Preguntas frecuentes</h2>
                <div className="mt-4 space-y-3">
                  {course.faqs.map((f) => (
                    <details key={f.q} className="paper-card group overflow-hidden">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold">
                        {f.q}
                        <span className="shrink-0 transition-transform group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-sm text-black/60">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="h-fit space-y-4">
            {instructor && (
              <div className="paper-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                  Quién lo dicta
                </h3>
                <p className="mt-3 font-bold">{instructor.name}</p>
                <p className="text-sm text-black/60">{instructor.role}</p>
                <p className="mt-3 text-sm text-black/70">{instructor.bio}</p>
                {instructor.rating !== undefined &&
                  instructor.coursesCount !== undefined &&
                  instructor.studentsCount !== undefined && (
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
                  )}
              </div>
            )}

            <div className="paper-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                Respaldado por {parent.name}
              </h3>
              <p className="mt-3 text-sm text-black/70">{parent.summary}</p>
              <a
                href={parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold underline"
              >
                Conocer INGENIUMAN
              </a>
            </div>
          </aside>
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
