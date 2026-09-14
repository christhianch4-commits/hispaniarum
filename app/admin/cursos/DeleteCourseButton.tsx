"use client";

import { useState, useTransition } from "react";
import { deleteCourseAction } from "@/app/actions/admin-courses";

export default function DeleteCourseButton({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-black/60">¿Eliminar &quot;{courseTitle}&quot;?</span>
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const result = await deleteCourseAction(courseId);
              if (result?.error) {
                setError(result.error);
                setConfirming(false);
              }
            })
          }
          className="rounded-full bg-[#FF4A60] px-3 py-1 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "..." : "Sí, eliminar"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-full border border-black/20 px-3 py-1"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="text-right">
      <button
        onClick={() => {
          setError(null);
          setConfirming(true);
        }}
        className="text-xs font-semibold text-[#FF4A60] hover:underline"
      >
        Eliminar
      </button>
      {error && <p className="mt-1 max-w-[220px] text-xs text-[#FF4A60]">{error}</p>}
    </div>
  );
}
