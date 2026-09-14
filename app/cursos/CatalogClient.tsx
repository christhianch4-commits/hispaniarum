"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/app/components/CourseCard";
import { categories } from "@/app/data/categories";
import type { CourseWithId } from "@/lib/queries/courses";

const levels = ["Principiante", "Intermedio", "Avanzado"] as const;

export default function CatalogClient({ courses }: { courses: CourseWithId[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? "todas";

  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState<string>("todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory = category === "todas" || c.categorySlug === category;
      const matchesLevel = level === "todas" || c.level === level;
      const matchesQuery =
        query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesLevel && matchesQuery;
    });
  }, [courses, category, level, query]);

  return (
    <div>
      <div className="paper-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cursos por nombre o tema..."
          className="w-full rounded-full border-2 border-black/10 px-4 py-2 text-sm focus:border-black focus:outline-none sm:max-w-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border-2 border-black/10 px-4 py-2 text-sm focus:border-black focus:outline-none"
        >
          <option value="todas">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-full border-2 border-black/10 px-4 py-2 text-sm focus:border-black focus:outline-none"
        >
          <option value="todas">Todos los niveles</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-black/50">
        {filtered.length} {filtered.length === 1 ? "curso encontrado" : "cursos encontrados"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="paper-card mt-6 p-10 text-center text-black/50">
          No encontramos cursos con esos filtros. Prueba con otra búsqueda.
        </div>
      )}
    </div>
  );
}
