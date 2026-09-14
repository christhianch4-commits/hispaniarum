"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = code.trim().toUpperCase();
        if (trimmed) router.push(`/verificar/${encodeURIComponent(trimmed)}`);
      }}
    >
      <input
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="HISP-XXXX-XXXX"
        className="w-full rounded-2xl border-2 border-black/10 px-4 py-3 text-sm uppercase tracking-wide focus:border-black focus:outline-none"
      />
      <button
        type="submit"
        className="paper-btn whitespace-nowrap bg-black px-6 py-3 text-sm text-white"
      >
        Verificar certificado
      </button>
    </form>
  );
}
