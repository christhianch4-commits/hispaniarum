"use client";

import { useActionState } from "react";
import { submitCompanyLead } from "@/app/actions/leads";
import { brand } from "@/app/data/site";

const inputClass =
  "rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitCompanyLead, undefined);

  if (state?.success) {
    const { name, company } = state.success;
    const text = encodeURIComponent(
      `Hola, soy ${name} de ${company}. Quiero información sobre capacitación para mi equipo en INGENIUACADEMY.`
    );
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-black/10 p-8 text-center">
        <p className="text-2xl">✅</p>
        <p className="mt-2 font-bold">¡Gracias! Recibimos tu solicitud.</p>
        <p className="mt-1 text-sm text-black/60">
          Un asesor te contactará pronto. Si prefieres una respuesta más rápida,
          escríbenos por WhatsApp.
        </p>
        <a
          href={`${brand.whatsapp}?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="paper-btn mt-5 inline-block bg-black px-6 py-3 text-sm text-white"
        >
          Escribir por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-3">
      {state?.error && (
        <p className="rounded-xl bg-[#D62828]/10 px-4 py-2 text-sm font-medium text-[#D62828]">
          {state.error}
        </p>
      )}
      {/* Campo trampa anti-bots: oculto para personas. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input required name="name" type="text" placeholder="Nombre completo" className={inputClass} />
      <input required name="company" type="text" placeholder="Empresa" className={inputClass} />
      <input required name="email" type="email" placeholder="Correo corporativo" className={inputClass} />
      <input
        name="teamSize"
        type="text"
        placeholder="N° de técnicos a capacitar (aprox.)"
        className={inputClass}
      />
      <textarea
        name="message"
        rows={3}
        placeholder="¿Qué te gustaría capacitar? (opcional)"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={pending}
        className="paper-btn mt-2 bg-black px-6 py-3 text-sm text-white disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Solicitar información"}
      </button>
    </form>
  );
}
