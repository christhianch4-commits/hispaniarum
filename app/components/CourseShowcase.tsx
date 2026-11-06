"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CourseCard from "@/app/components/CourseCard";
import { categories } from "@/app/data/categories";
import type { CourseWithId } from "@/lib/queries/courses";

/** Vitrina con pestañas: «Destacados» + una pestaña por categoría con cursos. */
export default function CourseShowcase({ courses }: { courses: CourseWithId[] }) {
  const tabs = useMemo(() => {
    // Destacados primero; si son pocos, se completa con el resto hasta 6.
    const featured = [
      ...courses.filter((c) => c.featured),
      ...courses.filter((c) => !c.featured),
    ];
    const byCategory = categories
      .map((cat) => ({
        key: cat.slug,
        label: `${cat.icon} ${cat.name}`,
        items: courses.filter((c) => c.categorySlug === cat.slug),
      }))
      .filter((t) => t.items.length > 0);
    return [
      { key: "destacados", label: "⭐ Destacados", items: featured },
      ...byCategory,
    ];
  }, [courses]);

  const [active, setActive] = useState("destacados");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];
  const visible = current.items.slice(0, 6);

  return (
    <div>
      <div
        className="chip-scroll -mx-6 flex gap-2 overflow-x-auto px-6 pb-2"
        role="tablist"
        aria-label="Cursos por categoría"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === current.key}
            onClick={() => setActive(t.key)}
            className={
              "shrink-0 whitespace-nowrap rounded-full border-2 border-black px-4 py-2 text-sm font-semibold transition-colors " +
              (t.key === current.key ? "bg-black text-white" : "bg-white hover:bg-black/5")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* key = reinicia la animación de entrada al cambiar de pestaña */}
      <div
        key={current.key}
        role="tabpanel"
        className="showcase-grid mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>

      {current.items.length > visible.length && (
        <p className="mt-6 text-sm text-black/50">
          Mostrando {visible.length} de {current.items.length}.{" "}
          <Link
            href={current.key === "destacados" ? "/cursos" : `/cursos?categoria=${current.key}`}
            className="font-semibold text-black underline"
          >
            Ver todos
          </Link>
        </p>
      )}
    </div>
  );
}
