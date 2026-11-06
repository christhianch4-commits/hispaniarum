import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, PrimaryButton, SectionHeading, Tag } from "@/app/components/ui";
import { brand, parent } from "@/app/data/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Empresas | INGENIUACADEMY",
  description:
    "Capacitación técnica para equipos de campo: cupos corporativos o programas a la medida, impartidos por ingenieros de INGENIUMAN.",
};

const benefits = [
  {
    title: "Cupos corporativos",
    description:
      "Compra cupos para 5 o más técnicos. Cada persona recibe su propio acceso y su certificado.",
    color: "#0071BC",
  },
  {
    title: "Certificados verificables",
    description:
      "Cada certificado tiene código QR y verificación pública, para que tus clientes o auditores comprueben su autenticidad.",
    color: "#16A34A",
  },
  {
    title: "Hecho por ingenieros de campo",
    description:
      "Los contenidos nacen de la operación real de INGENIUMAN en telecomunicaciones, petróleos, eléctrica, civil y mecánica.",
    color: "#D62828",
  },
  {
    title: "Programas a la medida",
    description:
      "Adaptamos o creamos cursos para tu industria, tus equipos y tus procedimientos, en modalidad en línea, en vivo o presencial.",
    color: "#FFC224",
  },
];

const process = [
  {
    title: "Cuéntanos tu necesidad",
    description: "Qué equipo quieres capacitar, en qué temas y para cuántas personas.",
  },
  {
    title: "Recibe una propuesta",
    description: "Te proponemos cursos existentes o un programa a la medida, con alcance y precio.",
  },
  {
    title: "Capacita y certifica",
    description: "Tu equipo se capacita y cada participante recibe su certificado verificable.",
  },
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
              Capacita a tu <Highlight color="#00B8D9">equipo técnico</Highlight>{" "}
              con ingenieros de campo
            </h1>
            <p className="mt-6 max-w-md text-black/60">
              {brand.name} para empresas ofrece cupos corporativos y programas a
              la medida, respaldados por {parent.name}, con certificados
              verificables para cada participante.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="#contacto">Hablar con ventas</PrimaryButton>
            </div>
          </div>

          <div className="paper-card p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-black/40">
              Respaldado por {parent.name}
            </p>
            <p className="mt-3 text-sm text-black/60">{parent.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {parent.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border-2 border-black px-3 py-1 text-xs font-semibold"
                >
                  {area}
                </span>
              ))}
            </div>
            <a
              href={parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-semibold underline"
            >
              Conocer INGENIUMAN
            </a>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Beneficios"
            title={
              <>
                Todo lo que tu empresa necesita para{" "}
                <Highlight color="#0071BC">capacitar</Highlight>
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
            eyebrow="Cómo trabajamos"
            title={
              <>
                Tres pasos para{" "}
                <Highlight color="#FFC224">capacitar a tu equipo</Highlight>
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {process.map((step, i) => (
              <div key={step.title} className="paper-card p-6">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-black/60">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contacto"
          className="mt-20 grid gap-8 rounded-3xl border-2 border-black p-8 shadow-[0_3px_0_0_var(--ink)] md:grid-cols-2 md:p-12"
        >
          <div>
            <h2 className="text-2xl font-extrabold">
              Cuéntanos sobre tu empresa
            </h2>
            <p className="mt-3 text-black/60">
              Un asesor del equipo de {parent.name} te contactará para diseñar
              el plan de capacitación ideal para tu equipo.
            </p>
            <p className="mt-6 text-sm text-black/50">
              También puedes escribirnos a{" "}
              <a href={`mailto:${brand.email}`} className="font-semibold underline">
                {brand.email}
              </a>{" "}
              o por{" "}
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                WhatsApp ({brand.phone})
              </a>
              .
            </p>
          </div>

          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
