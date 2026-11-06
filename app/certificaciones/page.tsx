import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CourseCard from "@/app/components/CourseCard";
import { Highlight, PrimaryButton, SectionHeading } from "@/app/components/ui";
import { certifications } from "@/app/data/site";
import { getAllCourses } from "@/lib/queries/courses";

export const metadata: Metadata = {
  title: "Certificaciones | INGENIUACADEMY",
  description:
    "Cursos con certificación del Ministerio del Trabajo del Ecuador y certificados de finalización INGENIUACADEMY, todos verificables en línea.",
};

const steps = [
  {
    title: "Completa el curso",
    description: "Avanza por todas las clases y aprueba la evaluación final.",
  },
  {
    title: "Generamos tu certificado",
    description:
      "En minutos, con tu nombre, horas académicas y un código único de verificación.",
  },
  {
    title: "Descárgalo o compártelo",
    description:
      "En PDF listo para imprimir o directamente en tu perfil de LinkedIn.",
  },
];

export default async function CertificacionesPage() {
  const courses = await getAllCourses();
  const mdtCourses = courses.filter(
    (c) => c.certType === "mdt" || c.certType === "ambos"
  );

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Certificaciones"
          title={
            <>
              Certificados que{" "}
              <Highlight color="#16A34A">abren puertas</Highlight>
            </>
          }
          description="Cada curso indica con claridad qué certificado obtienes al finalizar: certificación del Ministerio del Trabajo (en los programas que la incluyen) o certificado de finalización de INGENIUACADEMY."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {certifications.map((cert) => (
            <div key={cert.title} className="paper-card p-8">
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black"
                style={{ backgroundColor: cert.color + "22" }}
              >
                <span
                  className="block h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: cert.color }}
                />
              </span>
              <h2 className="text-xl font-bold">{cert.title}</h2>
              <p className="mt-3 text-black/60">{cert.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {cert.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-black/40">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Proceso"
            title={
              <>
                Cómo obtienes tu{" "}
                <Highlight color="#0071BC">certificado</Highlight>
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

        {mdtCourses.length > 0 && (
        <section className="mt-20">
          <SectionHeading
            eyebrow="Certificación oficial"
            title={
              <>
                Cursos con aval del{" "}
                <Highlight color="#16A34A">Ministerio del Trabajo</Highlight>
              </>
            }
            description="Programas que siguen el proceso de certificación del Ministerio del Trabajo. Revisa en cada ficha los requisitos y la modalidad."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mdtCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
        )}

        <section className="mt-20 rounded-3xl bg-black p-8 text-white sm:flex sm:items-center sm:justify-between md:p-12">
          <div>
            <h3 className="text-2xl font-bold">
              ¿Tu empresa necesita certificar a todo el equipo?
            </h3>
            <p className="mt-2 max-w-md text-white/60">
              Diseñamos programas de capacitación con certificación para
              cumplir tus procesos internos y normativos.
            </p>
          </div>
          <div className="mt-6 sm:mt-0">
            <PrimaryButton href="/empresas" variant="light">
              Hablar con un asesor
            </PrimaryButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
