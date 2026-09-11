import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, PrimaryButton, SecondaryButton, SectionHeading } from "@/app/components/ui";
import { faqs, plans } from "@/app/data/site";
import FaqItem from "./FaqItem";

export const metadata: Metadata = {
  title: "Precios | Hispaniarum",
  description: "Planes para profesionales y empresas en Hispaniarum.",
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
              Un plan para{" "}
              <Highlight color="#FFC224">cada etapa</Highlight> de tu
              crecimiento
            </>
          }
          description="Cambia o cancela tu plan cuando quieras. Sin contratos forzosos."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "flex flex-col rounded-3xl border-2 border-black p-8 " +
                (plan.highlighted
                  ? "bg-black text-white shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                  : "bg-white shadow-[0_3px_0_0_rgba(0,0,0,1)]")
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
                {plan.name === "Empresas" ? (
                  plan.highlighted ? (
                    <PrimaryButton href="/empresas" variant="light" className="w-full text-center">
                      Hablar con ventas
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton href="/empresas" className="block w-full text-center">
                      Hablar con ventas
                    </SecondaryButton>
                  )
                ) : plan.highlighted ? (
                  <PrimaryButton href="/registro" variant="light" className="w-full text-center">
                    Comenzar ahora
                  </PrimaryButton>
                ) : (
                  <SecondaryButton href="/registro" className="block w-full text-center">
                    Comenzar ahora
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
                <Highlight color="#2F81F7">saber</Highlight>
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
