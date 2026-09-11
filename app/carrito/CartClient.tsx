"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/app/data/courses";
import { CertBadge } from "@/app/components/ui";

const seedSlugs = [courses[0].slug, courses[2].slug];

export default function CartClient() {
  const [items, setItems] = useState(
    courses.filter((c) => seedSlugs.includes(c.slug))
  );
  const [checkedOut, setCheckedOut] = useState(false);

  const total = items.reduce((acc, c) => acc + c.price, 0);

  if (checkedOut) {
    return (
      <div className="paper-card p-10 text-center">
        <p className="text-3xl">🎉</p>
        <h2 className="mt-3 text-xl font-extrabold">
          ¡Inscripción completada!
        </h2>
        <p className="mt-2 text-black/60">
          Esta es una demo visual del flujo de compra. Ya puedes ver tus
          cursos en tu panel.
        </p>
        <Link
          href="/dashboard"
          className="paper-btn mt-6 inline-block bg-black px-6 py-3 text-sm text-white"
        >
          Ir a mi panel
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="paper-card p-10 text-center">
        <p className="text-3xl">🛒</p>
        <h2 className="mt-3 text-xl font-extrabold">Tu carrito está vacío</h2>
        <p className="mt-2 text-black/60">
          Explora el catálogo y encuentra tu próximo curso.
        </p>
        <Link
          href="/cursos"
          className="paper-btn mt-6 inline-block bg-black px-6 py-3 text-sm text-white"
        >
          Explorar cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.7fr_1fr]">
      <div className="flex flex-col gap-4">
        {items.map((course) => (
          <div
            key={course.slug}
            className="paper-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <span
              className="h-16 w-16 shrink-0 rounded-2xl border-2 border-black"
              style={{ backgroundColor: course.color }}
              aria-hidden
            />
            <div className="flex-1">
              <p className="font-bold">{course.title}</p>
              <div className="mt-1">
                <CertBadge type={course.certType} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
              <span className="font-extrabold">${course.price}</span>
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((c) => c.slug !== course.slug))
                }
                className="text-xs font-semibold text-black/40 hover:text-black"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="paper-card h-fit p-6">
        <h3 className="font-bold">Resumen</h3>
        <div className="mt-4 flex justify-between text-sm text-black/60">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-black/60">
          <span>Descuentos</span>
          <span>$0</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-3 font-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button
          onClick={() => setCheckedOut(true)}
          className="paper-btn mt-6 w-full bg-black px-6 py-3 text-sm text-white"
        >
          Finalizar inscripción
        </button>
        <p className="mt-3 text-center text-xs text-black/40">
          Demo visual: no se procesa ningún pago real.
        </p>
      </div>
    </div>
  );
}
