"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-black/10 p-8 text-center">
        <p className="text-2xl">✅</p>
        <p className="mt-2 font-bold">¡Gracias! Recibimos tu solicitud.</p>
        <p className="mt-1 text-sm text-black/60">
          Un asesor te contactará pronto.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        required
        type="text"
        placeholder="Nombre completo"
        className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
      />
      <input
        required
        type="text"
        placeholder="Empresa"
        className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Correo corporativo"
        className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
      />
      <input
        type="text"
        placeholder="Número de colaboradores a capacitar"
        className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
      />
      <button
        type="submit"
        className="paper-btn mt-2 bg-black px-6 py-3 text-sm text-white"
      >
        Solicitar información
      </button>
    </form>
  );
}
