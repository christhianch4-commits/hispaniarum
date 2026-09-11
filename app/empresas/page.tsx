import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, PrimaryButton, SectionHeading, Tag } from "@/app/components/ui";
import { brand, companyLogos, testimonials } from "@/app/data/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Empresas | Hispaniarum",
  description:
    "Capacita a todo tu equipo con reportes centralizados y certificados avalados por el Ministerio del Trabajo del Ecuador.",
};

const benefits = [
  {
    title: "Panel administrativo centralizado",
    description:
      "Inscribe colaboradores, asigna cursos por área o cargo, y visualiza el avance de todo tu equipo en un solo lugar.",
    color: "#2F81F7",
  },
  {
    title: "Reportes de cumplimiento",
    description:
      "Exporta reportes de horas de capacitación y certificación por colaborador, listos para auditorías internas o del Ministerio del Trabajo.",
    color: "#16A34A",
  },
  {
    title: "Certificación con validez",
    description:
      "Cursos con aval del Ministerio del Trabajo para cumplir la capacitación obligatoria, y certificados empresariales para el resto del catálogo.",
    color: "#FF6B7A",
  },
  {
    title: "Contenido a medida",
    description:
      "Adaptamos o creamos cursos junto a tus especialistas internos para necesidades específicas de tu industria.",
    color: "#FFC224",
  },
];

const plans = [
  { size: "Hasta 20 colaboradores", price: "desde $199 / mes" },
  { size: "De 21 a 100 colaboradores", price: "desde $599 / mes" },
  { size: "Más de 100 colaboradores", price: "Cotización personalizada" },
];

export default function EmpresasPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Tag>Capacitación corporativa</Tag>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Certifica a tu <Highlight color="#6366F1">equipo completo</Highlight>{" "}
              con un solo panel
            </h1>
            <p className="mt-6 max-w-md text-black/60">
              {brand.name} para empresas centraliza la capacitación,
              seguimiento y certificación de tu personal, incluyendo cursos
              con aval del Ministerio del Trabajo del Ecuador.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="#contacto">Hablar con ventas</PrimaryButton>
            </div>
          </div>

          <div className="paper-card p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-black/40">
              Ya confían en nosotros
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {companyLogos.map((name) => (
                <span
                  key={name}
                  className="rounded-xl border-2 border-black/10 px-3 py-4 text-center text-sm font-bold text-black/60"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Beneficios"
            title={
              <>
                Todo lo que tu empresa necesita para{" "}
                <Highlight color="#2F81F7">capacitar</Highlight>
              </>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="paper-card p-6">
                <span
                  className="mb-3 block h-2.5 w-10 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
                <h3 className="font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-black/60">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Inversión"
            title={
              <>
                Planes según el{" "}
                <Highlight color="#FFC224">tamaño de tu equipo</Highlight>
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.size} className="paper-card p-6 text-center">
                <p className="font-bold">{p.size}</p>
                <p className="mt-2 text-black/60">{p.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Casos de éxito"
            title={
              <>
                Empresas que ya{" "}
                <Highlight color="#FF6B7A">capacitan con nosotros</Highlight>
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="paper-card flex flex-col p-6">
                <p className="flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="text-sm font-bold">{t.author}</p>
                  <p className="text-xs text-black/50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contacto"
          className="mt-20 grid gap-8 rounded-3xl border-2 border-black p-8 shadow-[0_3px_0_0_rgba(0,0,0,1)] md:grid-cols-2 md:p-12"
        >
          <div>
            <h2 className="text-2xl font-extrabold">
              Cuéntanos sobre tu empresa
            </h2>
            <p className="mt-3 text-black/60">
              Un asesor te contactará en menos de 24 horas hábiles para
              diseñar el plan de capacitación ideal para tu equipo.
            </p>
            <p className="mt-6 text-sm text-black/50">
              También puedes escribirnos a{" "}
              <a href={`mailto:${brand.email}`} className="font-semibold underline">
                {brand.email}
              </a>{" "}
              o llamarnos al {brand.phone}.
            </p>
          </div>

          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
