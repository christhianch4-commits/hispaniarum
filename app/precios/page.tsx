import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, PrimaryButton, SecondaryButton, SectionHeading } from "@/app/components/ui";
import { faqs, plans } from "@/app/data/site";
import FaqItem from "./FaqItem";

export const metadata: Metadata = {
  title: "Precios | INGENIUACADEMY",
  description: "Cursos individuales, cupos para equipos y programas a la medida en INGENIUACADEMY.",
};

export default function PreciosPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Precios"
          title={
            <>
              Paga por{" "}
              <Highlight color="#FFC224">curso</Highlight> o capacita a todo
              tu equipo
            </>
          }
          description="Cada curso muestra su precio. Para equipos y programas a la medida te enviamos una cotización."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "flex flex-col rounded-3xl border-2 border-black p-8 " +
                (plan.highlighted
                  ? "bg-black text-white shadow-[0_4px_0_0_var(--ink)]"
                  : "bg-white shadow-[0_3px_0_0_var(--ink)]")
              }
            >
              {plan.highlighted && (
                <span className="mb-3 w-fit rounded-full bg-[#FFC224] px-3 py-1 text-xs font-bold text-black">
                  Más elegido
                </span>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p
                className={
                  "mt-1 text-sm " +
                  (plan.highlighted ? "text-white/60" : "text-black/60")
                }
              >
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span
                  className={
                    "text-sm " +
                    (plan.highlighted ? "text-white/50" : "text-black/50")
                  }
                >
                  {plan.period}
                </span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span
                      className={
                        plan.highlighted ? "text-white/50" : "text-black/40"
                      }
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {plan.highlighted ? (
                  <PrimaryButton href={plan.cta.href} variant="light" className="w-full text-center">
                    {plan.cta.label}
                  </PrimaryButton>
                ) : (
                  <SecondaryButton href={plan.cta.href} className="block w-full text-center">
                    {plan.cta.label}
                  </SecondaryButton>
                )}
              </div>
            </div>
          ))}
        </div>

        <section id="faq" className="mt-24">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Todo lo que debes{" "}
                <Highlight color="#0071BC">saber</Highlight>
              </>
            }
          />
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <FaqItem key={f.question} question={f.question} answer={f.answer} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
