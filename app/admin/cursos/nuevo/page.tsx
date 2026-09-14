import type { Metadata } from "next";
import { categories } from "@/app/data/categories";
import { instructors } from "@/app/data/instructors";
import CourseForm from "../CourseForm";

export const metadata: Metadata = {
  title: "Nuevo curso | Admin Hispaniarum",
};

export default function NuevoCursoPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Nuevo curso</h1>
      <p className="mt-1 text-black/60">Se publica de inmediato en el catálogo.</p>

      <div className="mt-8 max-w-3xl">
        <CourseForm mode="create" categories={categories} instructors={instructors} />
      </div>
    </div>
  );
}
