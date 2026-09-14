"use client";

import { useActionState, useState } from "react";
import type { Category } from "@/app/data/categories";
import type { Instructor } from "@/app/data/instructors";
import type { CourseWithId } from "@/lib/queries/courses";
import {
  createCourseAction,
  updateCourseAction,
  type AdminFormState,
} from "@/app/actions/admin-courses";

type ModuleDraft = {
  title: string;
  lessons: { title: string; duration: string; free: boolean }[];
};

const levels = ["Principiante", "Intermedio", "Avanzado"] as const;
const certTypes: { value: string; label: string }[] = [
  { value: "empresarial", label: "Certificado empresarial" },
  { value: "mdt", label: "Aval Ministerio del Trabajo" },
  { value: "ambos", label: "MDT + Empresarial" },
];
const colorSwatches = ["#FF6B7A", "#2F81F7", "#FFC224", "#FF4A60", "#6366F1", "#16A34A", "#0A0A0A"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CourseForm({
  mode,
  courseId,
  initialCourse,
  categories,
  instructors,
}: {
  mode: "create" | "edit";
  courseId?: string;
  initialCourse?: CourseWithId;
  categories: Category[];
  instructors: Instructor[];
}) {
  const action =
    mode === "edit" && courseId
      ? updateCourseAction.bind(null, courseId)
      : createCourseAction;
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    action,
    undefined
  );

  const [title, setTitle] = useState(initialCourse?.title ?? "");
  const [slug, setSlug] = useState(initialCourse?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [color, setColor] = useState(initialCourse?.color ?? colorSwatches[1]);
  const [modules, setModules] = useState<ModuleDraft[]>(
    initialCourse?.modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({ title: l.title, duration: l.duration, free: !!l.free })),
    })) ?? []
  );

  function addModule() {
    setModules((prev) => [...prev, { title: "", lessons: [] }]);
  }
  function removeModule(i: number) {
    setModules((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateModuleTitle(i: number, value: string) {
    setModules((prev) => prev.map((m, idx) => (idx === i ? { ...m, title: value } : m)));
  }
  function addLesson(i: number) {
    setModules((prev) =>
      prev.map((m, idx) =>
        idx === i ? { ...m, lessons: [...m.lessons, { title: "", duration: "10 min", free: false }] } : m
      )
    );
  }
  function removeLesson(i: number, j: number) {
    setModules((prev) =>
      prev.map((m, idx) =>
        idx === i ? { ...m, lessons: m.lessons.filter((_, li) => li !== j) } : m
      )
    );
  }
  function updateLesson(
    i: number,
    j: number,
    field: "title" | "duration" | "free",
    value: string | boolean
  ) {
    setModules((prev) =>
      prev.map((m, idx) =>
        idx === i
          ? {
              ...m,
              lessons: m.lessons.map((l, li) => (li === j ? { ...l, [field]: value } : l)),
            }
          : m
      )
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="modulesJson" value={JSON.stringify(modules)} />

      {state?.error && (
        <p className="rounded-xl bg-[#FF4A60]/10 px-4 py-3 text-sm font-medium text-[#FF4A60]">
          {state.error}
        </p>
      )}

      <section className="paper-card p-6">
        <h2 className="font-bold">Información general</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Título
            <input
              required
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Slug (URL)
            <input
              required
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="rounded-xl border-2 border-black/10 px-3 py-2 font-mono focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Descripción corta
            <input
              required
              name="shortDescription"
              defaultValue={initialCourse?.shortDescription}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Descripción completa
            <textarea
              required
              name="description"
              rows={4}
              defaultValue={initialCourse?.description}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Categoría
            <select
              name="categorySlug"
              defaultValue={initialCourse?.categorySlug ?? categories[0]?.slug}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Instructor
            <select
              name="instructorSlug"
              defaultValue={initialCourse?.instructorSlug ?? instructors[0]?.slug}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            >
              {instructors.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Nivel
            <select
              name="level"
              defaultValue={initialCourse?.level ?? "Principiante"}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Certificado
            <select
              name="certType"
              defaultValue={initialCourse?.certType ?? "empresarial"}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            >
              {certTypes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Precio (USD)
            <input
              required
              type="number"
              min={0}
              step="0.01"
              name="price"
              defaultValue={initialCourse?.price}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Precio anterior (opcional)
            <input
              type="number"
              min={0}
              step="0.01"
              name="oldPrice"
              defaultValue={initialCourse?.oldPrice}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Duración (horas)
            <input
              required
              type="number"
              min={1}
              name="durationHours"
              defaultValue={initialCourse?.durationHours}
              className="rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-1 text-sm">
            Color
            <div className="flex items-center gap-2">
              {colorSwatches.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="h-7 w-7 rounded-full border-2"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? "#0a0a0a" : "transparent",
                  }}
                  aria-label={c}
                />
              ))}
            </div>
            <input type="hidden" name="color" value={color} />
          </div>

          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initialCourse?.featured}
              className="h-4 w-4"
            />
            Destacar en la portada
          </label>
        </div>
      </section>

      <section className="paper-card p-6">
        <h2 className="font-bold">Lo que aprenderán</h2>
        <p className="mt-1 text-xs text-black/50">Un punto por línea.</p>
        <textarea
          name="whatYouWillLearn"
          rows={4}
          defaultValue={initialCourse?.whatYouWillLearn.join("\n")}
          className="mt-3 w-full rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
        />
      </section>

      <section className="paper-card p-6">
        <h2 className="font-bold">Requisitos</h2>
        <p className="mt-1 text-xs text-black/50">Un punto por línea.</p>
        <textarea
          name="requirements"
          rows={3}
          defaultValue={initialCourse?.requirements.join("\n")}
          className="mt-3 w-full rounded-xl border-2 border-black/10 px-3 py-2 focus:border-black focus:outline-none"
        />
      </section>

      <section className="paper-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Temario</h2>
          <button
            type="button"
            onClick={addModule}
            className="paper-btn border-2 border-black px-4 py-2 text-xs"
          >
            + Módulo
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {modules.map((mod, i) => (
            <div key={i} className="rounded-2xl border-2 border-black/10 p-4">
              <div className="flex items-center gap-2">
                <input
                  value={mod.title}
                  onChange={(e) => updateModuleTitle(i, e.target.value)}
                  placeholder={`Módulo ${i + 1}`}
                  className="flex-1 rounded-xl border-2 border-black/10 px-3 py-2 text-sm font-semibold focus:border-black focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeModule(i)}
                  className="text-xs font-semibold text-[#FF4A60]"
                >
                  Quitar módulo
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {mod.lessons.map((lesson, j) => (
                  <div key={j} className="flex flex-wrap items-center gap-2">
                    <input
                      value={lesson.title}
                      onChange={(e) => updateLesson(i, j, "title", e.target.value)}
                      placeholder="Título de la clase"
                      className="min-w-[180px] flex-1 rounded-lg border border-black/10 px-2 py-1.5 text-xs focus:border-black focus:outline-none"
                    />
                    <input
                      value={lesson.duration}
                      onChange={(e) => updateLesson(i, j, "duration", e.target.value)}
                      placeholder="12 min"
                      className="w-20 rounded-lg border border-black/10 px-2 py-1.5 text-xs focus:border-black focus:outline-none"
                    />
                    <label className="flex items-center gap-1 text-xs text-black/60">
                      <input
                        type="checkbox"
                        checked={lesson.free}
                        onChange={(e) => updateLesson(i, j, "free", e.target.checked)}
                      />
                      Vista previa
                    </label>
                    <button
                      type="button"
                      onClick={() => removeLesson(i, j)}
                      className="text-xs text-[#FF4A60]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addLesson(i)}
                className="mt-3 text-xs font-semibold underline"
              >
                + Añadir clase
              </button>
            </div>
          ))}

          {modules.length === 0 && (
            <p className="text-sm text-black/40">Aún no hay módulos.</p>
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="paper-btn bg-black px-8 py-3 text-sm text-white disabled:opacity-60"
      >
        {pending ? "Guardando..." : mode === "create" ? "Crear curso" : "Guardar cambios"}
      </button>
    </form>
  );
}
