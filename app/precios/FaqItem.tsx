"use client";

import { useState } from "react";

export default function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="paper-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold"
      >
        {question}
        <span
          className={`shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open && <p className="px-5 pb-5 text-sm text-black/60">{answer}</p>}
    </div>
  );
}
