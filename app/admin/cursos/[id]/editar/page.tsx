import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/queries/courses";
import { categories } from "@/app/data/categories";
import { instructors } from "@/app/data/instructors";
import CourseForm from "../../CourseForm";

export const metadata: Metadata = {
  title: "Editar curso | Admin Hispaniarum",
};

export default async function EditarCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Editar curso</h1>
      <p className="mt-1 text-black/60">{course.title}</p>

      <div className="mt-8 max-w-3xl">
        <CourseForm
          mode="edit"
          courseId={course.id}
          initialCourse={course}
          categories={categories}
          instructors={instructors}
        />
      </div>
    </div>
  );
}
