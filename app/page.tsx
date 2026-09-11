import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Avatar from "@/app/components/Avatar";
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
import { getFeaturedCourses } from "@/app/data/courses";
import { brand, certifications, companyLogos, heroStats, testimonials } from "@/app/data/site";

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
      "Al completar el curso recibes tu certificado empresarial o el aval del Ministerio del Trabajo, listo para compartir.",
  },
];

export default function Home() {
  const featured = getFeaturedCourses();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <Tag>Plataforma de capacitación en Ecuador</Tag>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Capacítate y{" "}
              <Highlight color="#FF6B7A">certifícate</Highlight> sin salir
              de casa
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

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold">{s.value}</p>
                  <p className="text-xs text-black/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Avatar
            bg="#FFC224"
            shirt="#FF6B7A"
            className="mx-auto w-full max-w-sm"
          />
        </section>

        {/* Empresas que confían */}
        <section className="border-y-2 border-black/5 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-black/40">
            Empresas que ya capacitan a sus equipos con {brand.name}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {companyLogos.map((name) => (
              <span key={name} className="text-lg font-bold text-black/25">
                {name}
              </span>
            ))}
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
                  <Highlight color="#2F81F7">categoría</Highlight>
                </>
              }
              description="Programas diseñados para necesidades reales de personas y empresas."
            />
            <SecondaryButton href="/cursos">Ver todos los cursos</SecondaryButton>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
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
                <Highlight color="#6366F1">{brand.name}</Highlight>
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
                Panel administrativo, reportes de cumplimiento y certificados
                MDT o empresariales para toda tu organización.
              </p>
            </div>
            <PrimaryButton
              href="/empresas"
              variant="light"
              className="whitespace-nowrap"
            >
              Conocer plan Empresas
            </PrimaryButton>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-20">
          <SectionHeading
            eyebrow="Casos de éxito"
            title={
              <>
                Lo que dicen{" "}
                <Highlight color="#2F81F7">quienes ya se capacitaron</Highlight>
              </>
            }
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="paper-card flex flex-col p-6">
                <p className="flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="block h-9 w-9 rounded-full bg-black/10" />
                  <div>
                    <p className="text-sm font-bold">{t.author}</p>
                    <p className="text-xs text-black/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-12">
            <div>
              <h3 className="text-2xl font-bold">
                Recibe nuevos cursos y becas antes que nadie
              </h3>
              <p className="mt-1 max-w-md text-white/60">
                Sin spam. Solo novedades de cursos, certificaciones y
                promociones para empresas.
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
