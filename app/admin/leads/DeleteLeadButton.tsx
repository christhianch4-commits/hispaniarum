"use client";

import { useTransition } from "react";
import { deleteLeadAction } from "@/app/actions/leads";

export default function DeleteLeadButton({ leadId }: { leadId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm("¿Eliminar esta solicitud?")) {
          startTransition(() => deleteLeadAction(leadId).then(() => undefined));
        }
      }}
      className="text-xs font-semibold text-[#D62828] hover:underline disabled:opacity-50"
    >
      {pending ? "..." : "Eliminar"}
    </button>
  );
}
