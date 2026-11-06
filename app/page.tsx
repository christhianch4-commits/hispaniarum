import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CourseCard from "@/app/components/CourseCard";
import CategoryCard from "@/app/components/CategoryCard";
import NewsletterForm from "@/app/components/NewsletterForm";
import {
  Highlight,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  Tag,
} from "@/app/components/ui";
import { categories } from "@/app/data/categories";
import { getAllCourses, getFeaturedCourses } from "@/lib/queries/courses";
import { brand, certifications, heroStats, parent } from "@/app/data/site";

const steps = [
  {
    title: "Elige tu curso",
    description:
      "Explora el catálogo por categoría, nivel o certificación y encuentra el curso ideal para ti o tu equipo.",
  },
  {
    title: "Aprende a tu ritmo",
    description:
      "Video-clases cortas, materiales descargables y evaluaciones prácticas. Tu progreso se guarda automáticamente.",
  },
  {
    title: "Obtén tu certificado",
    description:
      "Al completar el curso recibes tu certificado de finalización o, en los programas que lo incluyen, la certificación del Ministerio del Trabajo.",
  },
];

export default async function Home() {
  const [featured, allCourses] = await Promise.all([
    getFeaturedCourses(),
    getAllCourses(),
  ]);
  const categoryCounts = new Map<string, number>();
  for (const c of allCourses) {
    categoryCounts.set(c.categorySlug, (categoryCounts.get(c.categorySlug) ?? 0) + 1);
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <Tag>Powered by INGENIUMAN · +25 años en ingeniería</Tag>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Aprende de ingenieros que operan en{" "}
              <Highlight color="#D62828">campo</Highlight> y certifícate
            </h1>
            <p className="mt-6 max-w-md text-black/60">
              {brand.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/cursos">Explorar cursos</PrimaryButton>
              <SecondaryButton href="/certificaciones">
                Ver certificaciones
              </SecondaryButton>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold">{s.value}</p>
                  <p className="text-xs text-black/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src="/hero-illustration.jpg"
            alt="Persona avanzando un curso en su tablet, rodeada de íconos de capacitación"
            width={1024}
            height={1024}
            priority
            className="mx-auto w-full max-w-sm rounded-3xl"
          />
        </section>

        {/* Respaldo INGENIUMAN */}
        <section className="border-y-2 border-black/5 py-10">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                Respaldado por {parent.name}
              </p>
              <p className="mt-2 text-sm text-black/60">{parent.summary}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {parent.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border-2 border-black px-3 py-1 text-xs font-semibold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Catálogo"
              title={
                <>
                  Explora por{" "}
                  <Highlight color="#0071BC">categoría</Highlight>
                </>
              }
              description="Programas diseñados para necesidades reales de personas y empresas."
            />
            <SecondaryButton href="/cursos">Ver todos los cursos</SecondaryButton>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                count={categoryCounts.get(c.slug) ?? 0}
              />
            ))}
          </div>
        </section>

        {/* Cursos destacados */}
        <section className="py-20">
          <SectionHeading
            eyebrow="Los favoritos"
            title={
              <>
                Cursos <Highlight color="#FFC224">más populares</Highlight>
              </>
            }
            description="Los programas con mejor calificación y más estudiantes activos este mes."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <div className="mt-8">
            <SecondaryButton href="/cursos">Ver todo el catálogo</SecondaryButton>
          </div>
        </section>

        {/* Certificaciones */}
        <section className="py-20">
          <SectionHeading
            eyebrow="Lo que nos diferencia"
            title={
              <>
                Certificados que{" "}
                <Highlight color="#16A34A">realmente cuentan</Highlight>
              </>
            }
            description="Cada curso indica claramente qué tipo de certificado obtienes al finalizar."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.title} className="paper-card p-8">
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black"
                  style={{ backgroundColor: cert.color + "22" }}
                >
                  <span
                    className="block h-3 w-3 rounded-full"
                    style={{ backgroundColor: cert.color }}
                  />
                </span>
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <p className="mt-2 text-sm text-black/60">
                  {cert.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {cert.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-black/40">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SecondaryButton href="/certificaciones">
              Conocer más sobre certificaciones
            </SecondaryButton>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-20">
          <SectionHeading
            eyebrow="Es muy simple"
            title={
              <>
                Cómo funciona{" "}
                <Highlight color="#00B8D9">{brand.name}</Highlight>
              </>
            }
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="paper-card p-6">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-black/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA empresas */}
        <section className="py-20">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-12">
            <div>
              <h3 className="text-2xl font-bold">
                ¿Necesitas capacitar a tu equipo completo?
              </h3>
              <p className="mt-2 max-w-md text-white/60">
                Cupos corporativos con certificado para cada técnico, o
                programas a la medida impartidos por ingenieros de{" "}
                {parent.name}.
              </p>
            </div>
            <PrimaryButton
              href="/empresas"
              variant="light"
              className="whitespace-nowrap"
            >
              Ver opciones para empresas
            </PrimaryButton>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-12">
            <div>
              <h3 className="text-2xl font-bold">
                Entérate primero de los nuevos cursos
              </h3>
              <p className="mt-1 max-w-md text-white/60">
                Sin spam. Solo novedades de cursos, fechas de programas en
                vivo y certificaciones.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
