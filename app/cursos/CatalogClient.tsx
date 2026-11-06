"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/app/components/CourseCard";
import { categories } from "@/app/data/categories";
import type { CourseWithId } from "@/lib/queries/courses";

const levels = ["Todos los niveles", "Principiante", "Intermedio", "Avanzado"] as const;

const sorts = [
  { value: "destacados", label: "Destacados" },
  { value: "valorados", label: "Mejor valorados" },
  { value: "alumnos", label: "Más alumnos" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
] as const;

const selectClass =
  "rounded-full border-2 border-black/10 bg-white px-4 py-2 text-sm font-medium focus:border-black focus:outline-none";

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function CatalogClient({ courses }: { courses: CourseWithId[] }) {
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("categoria") ?? "todas");
  const [level, setLevel] = useState("todas");
  const [price, setPrice] = useState("todos");
  const [cert, setCert] = useState("todos");
  const [sort, setSort] = useState("destacados");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Mantiene la URL compartible (?categoria=…&q=…) sin recargar la página.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "todas") params.set("categoria", category);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query]);

  const categoryOptions = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, count: courses.filter((x) => x.categorySlug === c.slug).length }))
        .filter((c) => c.count > 0),
    [courses]
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    const list = courses.filter((c) => {
      if (category !== "todas" && c.categorySlug !== category) return false;
      if (level !== "todas" && c.level !== level) return false;
      if (price === "gratis" && !c.isFree) return false;
      if (price === "pago" && c.isFree) return false;
      if (cert === "mdt" && c.certType === "empresarial") return false;
      if (cert === "empresarial" && c.certType === "mdt") return false;
      if (q && !normalize(`${c.title} ${c.shortDescription} ${c.description}`).includes(q)) {
        return false;
      }
      return true;
    });
    const sorted = [...list];
    if (sort === "valorados") sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    if (sort === "alumnos") sorted.sort((a, b) => b.studentsCount - a.studentsCount);
    if (sort === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [courses, category, level, price, cert, sort, query]);

  const activeFilters = [
    category !== "todas" && {
      key: "categoria",
      label: categoryOptions.find((c) => c.slug === category)?.name ?? category,
      clear: () => setCategory("todas"),
    },
    level !== "todas" && { key: "nivel", label: level, clear: () => setLevel("todas") },
    price !== "todos" && {
      key: "precio",
      label: price === "gratis" ? "Solo gratis" : "Solo de pago",
      clear: () => setPrice("todos"),
    },
    cert !== "todos" && {
      key: "cert",
      label: cert === "mdt" ? "Aval Ministerio del Trabajo" : "Certificado empresarial",
      clear: () => setCert("todos"),
    },
    query.trim() && { key: "q", label: `“${query.trim()}”`, clear: () => setQuery("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  function resetAll() {
    setCategory("todas");
    setLevel("todas");
    setPrice("todos");
    setCert("todos");
    setQuery("");
    setSort("destacados");
  }

  return (
    <div>
      {/* Buscador */}
      <div className="paper-card relative flex items-center gap-3 px-5 py-3">
        <span aria-hidden className="text-lg text-black/40">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por tema, equipo o certificación…"
          aria-label="Buscar cursos"
          className="w-full bg-transparent text-base focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Borrar búsqueda"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black text-xs font-bold hover:bg-black hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categorías como chips */}
      <div
        className="chip-scroll -mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-2"
        role="tablist"
        aria-label="Categorías"
      >
        <button
          type="button"
          role="tab"
          aria-selected={category === "todas"}
          onClick={() => setCategory("todas")}
          className={chipClass(category === "todas")}
        >
          Todas <span className="opacity-60">{courses.length}</span>
        </button>
        {categoryOptions.map((c) => (
          <button
            key={c.slug}
            type="button"
            role="tab"
            aria-selected={category === c.slug}
            onClick={() => setCategory(category === c.slug ? "todas" : c.slug)}
            className={chipClass(category === c.slug)}
          >
            <span aria-hidden>{c.icon}</span> {c.name}{" "}
            <span className="opacity-60">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Filtros y orden */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass} aria-label="Nivel">
          <option value="todas">Cualquier nivel</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className={selectClass} aria-label="Precio">
          <option value="todos">Gratis y de pago</option>
          <option value="gratis">Solo gratis</option>
          <option value="pago">Solo de pago</option>
        </select>
        <select value={cert} onChange={(e) => setCert(e.target.value)} className={selectClass} aria-label="Certificado">
          <option value="todos">Cualquier certificado</option>
          <option value="mdt">Aval Ministerio del Trabajo</option>
          <option value="empresarial">Certificado empresarial</option>
        </select>
        <label className="ml-auto flex items-center gap-2 text-sm text-black/60">
          Ordenar por
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Resultado y filtros activos */}
      <div className="mt-5 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="mr-2 text-sm font-semibold text-black/60">
          {filtered.length} {filtered.length === 1 ? "curso" : "cursos"}
        </p>
        {activeFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={f.clear}
            className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white"
          >
            {f.label} <span aria-hidden>✕</span>
            <span className="sr-only">quitar filtro</span>
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button type="button" onClick={resetAll} className="text-xs font-semibold underline">
            Limpiar todo
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="paper-card mt-6 flex flex-col items-center gap-4 p-12 text-center">
          <span aria-hidden className="text-4xl">
            🔎
          </span>
          <p className="font-bold">No encontramos cursos con esos filtros</p>
          <p className="max-w-sm text-sm text-black/50">
            Prueba con otra palabra o quita algún filtro para ver más resultados.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="paper-btn bg-black px-6 py-2.5 text-sm text-white"
          >
            Ver todos los cursos
          </button>
        </div>
      )}
    </div>
  );
}

function chipClass(active: boolean) {
  return (
    "shrink-0 whitespace-nowrap rounded-full border-2 border-black px-4 py-2 text-sm font-semibold transition-colors " +
    (active ? "bg-black text-white" : "bg-white hover:bg-black/5")
  );
}
