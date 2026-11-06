"use client";

import { useTransition } from "react";
import { setSamplesPublishedAction } from "@/app/actions/admin-courses";

/** Interruptor para publicar u ocultar todos los cursos de ejemplo. */
export default function SamplesToggle({ visible, total }: { visible: number; total: number }) {
  const [pending, startTransition] = useTransition();
  const allHidden = visible === 0;

  return (
    <div className="paper-card mt-6 flex flex-wrap items-center justify-between gap-4 bg-[#FFF8E1] p-4 text-sm">
      <p className="max-w-xl">
        <strong>Cursos de ejemplo:</strong> {total} en total, {visible} visibles en el sitio.
        Dan variedad a la demo; cuando carguen los reales, ocúltalos aquí de una vez.
      </p>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => void setSamplesPublishedAction(allHidden))}
        className="paper-btn border-2 border-black bg-white px-5 py-2 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Aplicando…" : allHidden ? "Mostrar ejemplos" : "Ocultar todos los ejemplos"}
      </button>
    </div>
  );
}
