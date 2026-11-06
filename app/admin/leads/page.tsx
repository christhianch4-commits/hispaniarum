import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { brand } from "@/app/data/site";
import DeleteLeadButton from "./DeleteLeadButton";

export const metadata: Metadata = {
  title: "Solicitudes | Admin INGENIUACADEMY",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
  const companies = leads.filter((l) => l.type === "empresa");
  const subscribers = leads.filter((l) => l.type === "newsletter");

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Solicitudes</h1>
      <p className="mt-1 text-black/60">
        {companies.length} de empresas · {subscribers.length} suscriptores al newsletter.
      </p>

      <h2 className="mt-10 text-lg font-extrabold">Empresas</h2>
      <div className="mt-4 grid gap-3">
        {companies.map((l) => {
          const text = encodeURIComponent(
            `Hola ${l.name}, te escribimos de INGENIUACADEMY por tu solicitud de capacitación para ${l.company}.`
          );
          return (
            <div key={l.id} className="paper-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">
                    {l.company} <span className="font-normal text-black/50">· {l.name}</span>
                  </p>
                  <p className="text-sm text-black/60">
                    <a href={`mailto:${l.email}`} className="underline">
                      {l.email}
                    </a>
                    {l.teamSize ? ` · ${l.teamSize} técnicos` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-black/40">
                    {l.createdAt.toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                  <a
                    href={`${brand.whatsapp}?text=${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    WhatsApp
                  </a>
                  <DeleteLeadButton leadId={l.id} />
                </div>
              </div>
              {l.message && <p className="mt-3 text-sm text-black/70">{l.message}</p>}
            </div>
          );
        })}
        {companies.length === 0 && (
          <div className="paper-card p-8 text-center text-black/50">
            Aún no hay solicitudes de empresas.
          </div>
        )}
      </div>

      <h2 className="mt-10 text-lg font-extrabold">Newsletter</h2>
      <div className="paper-card mt-4 divide-y divide-black/10">
        {subscribers.map((l) => (
          <div key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
            <span>{l.email}</span>
            <span className="flex items-center gap-4 text-xs text-black/40">
              {l.createdAt.toLocaleDateString("es-EC", { dateStyle: "medium" })}
              <DeleteLeadButton leadId={l.id} />
            </span>
          </div>
        ))}
        {subscribers.length === 0 && (
          <p className="p-6 text-center text-sm text-black/50">Aún no hay suscriptores.</p>
        )}
      </div>
    </div>
  );
}
