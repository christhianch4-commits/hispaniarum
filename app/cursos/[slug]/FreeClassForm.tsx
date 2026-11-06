"use client";

import { useActionState } from "react";
import { requestFreeClass } from "@/app/actions/leads";

const inputClass =
  "w-full rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none";

export default function FreeClassForm({ courseSlug }: { courseSlug: string }) {
  const [state, formAction, pending] = useActionState(requestFreeClass, undefined);

  if (state?.accessUrl) {
    return (
      <div className="text-center">
        <p className="text-2xl">🎉</p>
        <p className="mt-2 font-bold">¡Listo! Ya puedes ver la clase.</p>
        <a
          href={state.accessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="paper-btn mt-4 block bg-black px-6 py-3 text-sm text-white"
        >
          Ir a la clase en Hotmart
        </a>
        <ol className="mt-4 space-y-1 text-left text-xs text-black/60">
          <li>1. Entra al enlace y escribe tu correo.</li>
          <li>2. Hotmart te envía un código de acceso.</li>
          <li>3. Ingresa el código y mira la clase completa.</li>
        </ol>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {state?.error && (
        <p className="rounded-xl bg-[#D62828]/10 px-4 py-2 text-sm font-medium text-[#D62828]">
          {state.error}
        </p>
      )}
      <input required name="name" type="text" placeholder="Tu nombre" className={inputClass} />
      <input required name="email" type="email" placeholder="Tu correo" className={inputClass} />
      <label className="flex items-start gap-2 text-xs text-black/60">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4" />
        Acepto recibir información de cursos de INGENIUACADEMY por correo.
      </label>
      <button
        type="submit"
        disabled={pending}
        className="paper-btn bg-black px-6 py-3 text-sm text-white disabled:opacity-60"
      >
        {pending ? "Un momento..." : "Ver la clase gratis"}
      </button>
    </form>
  );
}
