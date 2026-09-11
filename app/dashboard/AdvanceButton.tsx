"use client";

import { useTransition } from "react";
import { advanceProgressAction } from "@/app/actions/enrollment";

export default function AdvanceButton({ enrollmentId }: { enrollmentId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => advanceProgressAction(enrollmentId))}
      className="paper-btn shrink-0 border-2 border-black px-4 py-2 text-xs disabled:opacity-50"
      title="Demo: simula avance de progreso (+25%)"
    >
      {pending ? "..." : "Continuar (+25%)"}
    </button>
  );
}
