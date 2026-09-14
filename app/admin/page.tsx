import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin | Hispaniarum",
};

export default async function AdminHomePage() {
  const [courseCount, userCount, enrollmentCount, certCount] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.certificateIssuance.count(),
  ]);

  const stats = [
    { label: "Cursos publicados", value: courseCount },
    { label: "Usuarios registrados", value: userCount },
    { label: "Inscripciones", value: enrollmentCount },
    { label: "Certificados emitidos", value: certCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Panel de administración</h1>
      <p className="mt-2 text-black/60">Resumen general de la plataforma.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="paper-card p-5">
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-black/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/admin/cursos"
          className="paper-btn inline-block bg-black px-6 py-3 text-sm text-white"
        >
          Gestionar cursos
        </Link>
      </div>
    </div>
  );
}
