"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { CourseWithId } from "@/lib/queries/courses";
import { CertBadge } from "@/app/components/ui";
import { checkoutAction } from "@/app/actions/enrollment";

export default function CartClient({ initialItems }: { initialItems: CourseWithId[] }) {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [checkedOut, setCheckedOut] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((acc, c) => acc + c.price, 0);

  function handleCheckout() {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/carrito");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await checkoutAction(items.map((c) => c.slug));
      if (!result.ok) {
        router.push(result.redirectTo ?? "/login");
        return;
      }
      setCheckedOut(true);
    });
  }

  if (checkedOut) {
    return (
      <div className="paper-card p-10 text-center">
        <p className="text-3xl">🎉</p>
        <h2 className="mt-3 text-xl font-extrabold">
          ¡Inscripción completada!
        </h2>
        <p className="mt-2 text-black/60">
          Ya quedaste inscrito. Revisa tu progreso en tu panel.
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
        {error && (
          <p className="mt-3 text-center text-xs font-medium text-[#FF4A60]">
            {error}
          </p>
        )}
        <button
          onClick={handleCheckout}
          disabled={pending}
          className="paper-btn mt-6 w-full bg-black px-6 py-3 text-sm text-white disabled:opacity-60"
        >
          {pending
            ? "Procesando..."
            : status === "authenticated"
              ? "Finalizar inscripción"
              : "Ingresar y finalizar inscripción"}
        </button>
        <p className="mt-3 text-center text-xs text-black/40">
          No se procesa ningún pago real todavía — solo te inscribe en el
          curso en tu cuenta.
        </p>
      </div>
    </div>
  );
}
