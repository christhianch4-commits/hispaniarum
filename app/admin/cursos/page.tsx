import type { Metadata } from "next";
import Link from "next/link";
import { getAllCourses } from "@/lib/queries/courses";
import { getCategory } from "@/app/data/categories";
import DeleteCourseButton from "./DeleteCourseButton";

export const metadata: Metadata = {
  title: "Cursos | Admin Hispaniarum",
};

export default async function AdminCursosPage() {
  const courses = await getAllCourses();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Cursos</h1>
          <p className="mt-1 text-black/60">
            {courses.length} {courses.length === 1 ? "curso" : "cursos"} publicados.
          </p>
        </div>
        <Link
          href="/admin/cursos/nuevo"
          className="paper-btn inline-block bg-black px-6 py-3 text-sm text-white"
        >
          + Nuevo curso
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-black/40">
              <th className="px-3">Curso</th>
              <th className="px-3">Categoría</th>
              <th className="px-3">Nivel</th>
              <th className="px-3">Precio</th>
              <th className="px-3">Certificado</th>
              <th className="px-3">Destacado</th>
              <th className="px-3" />
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const category = getCategory(course.categorySlug);
              return (
                <tr key={course.id} className="paper-card [&>td]:px-3 [&>td]:py-3">
                  <td>
                    <Link
                      href={`/admin/cursos/${course.id}/editar`}
                      className="font-bold hover:underline"
                    >
                      {course.title}
                    </Link>
                    <p className="text-xs text-black/40">{course.slug}</p>
                  </td>
                  <td>{category?.name ?? course.categorySlug}</td>
                  <td>{course.level}</td>
                  <td>${course.price}</td>
                  <td className="capitalize">{course.certType}</td>
                  <td>{course.featured ? "Sí" : "—"}</td>
                  <td>
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/cursos/${course.id}/editar`}
                        className="text-xs font-semibold hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteCourseButton courseId={course.id} courseTitle={course.title} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="paper-card mt-4 p-10 text-center text-black/50">
            Aún no hay cursos. Crea el primero.
          </div>
        )}
      </div>
    </div>
  );
}
