"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions/leads";

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, undefined);

  if (state?.success) {
    return (
      <p className="rounded-full border-2 border-white/30 px-6 py-3 text-sm font-semibold">
        ✅ ¡Listo! Te avisaremos de los nuevos cursos.
      </p>
    );
  }

  return (
    <form action={formAction} className="w-full max-w-sm sm:w-auto">
      <div className="flex gap-2">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="tu@correo.com"
          className="w-full rounded-full border-2 border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black disabled:opacity-60"
        >
          {pending ? "..." : "Suscribirme"}
        </button>
      </div>
      {state?.error && <p className="mt-2 text-xs text-[#FF9AA2]">{state.error}</p>}
    </form>
  );
}
