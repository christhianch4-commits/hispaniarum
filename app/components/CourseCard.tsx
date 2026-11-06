import Link from "next/link";
import type { Course } from "@/app/data/courses";
import { getCategory } from "@/app/data/categories";
import { getInstructor } from "@/app/data/instructors";
import { CertBadge, RatingStars, readableText } from "@/app/components/ui";
import { formatUsd } from "@/lib/hotmart";

export default function CourseCard({ course }: { course: Course }) {
  const instructor = getInstructor(course.instructorSlug);
  const category = getCategory(course.categorySlug);
  const text = readableText(course.color);
  const discount =
    course.oldPrice && !course.isFree
      ? Math.round(100 - (course.price / course.oldPrice) * 100)
      : 0;

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="paper-card card-lift group flex h-full flex-col overflow-hidden"
    >
      {/* Banda de color con patrón y el ícono del área */}
      <div
        className={`card-band relative flex h-40 flex-col justify-between overflow-hidden p-4 ${text}`}
        style={{ backgroundColor: course.color }}
      >
        <span
          aria-hidden
          className="card-icon pointer-events-none absolute -bottom-3 -right-1 select-none text-[6.5rem] leading-none opacity-25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
        >
          {category?.icon ?? "📘"}
        </span>

        <div className="relative z-10 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
            {course.isFree ? "Clase gratuita" : course.level}
          </span>
          {course.sample && (
            <span className="rounded-md border-2 border-black bg-[#FFC224] px-2 py-0.5 text-xs font-bold text-black">
              Ejemplo
            </span>
          )}
        </div>

        <div className="relative z-10 flex items-end justify-between gap-2">
          <span className="text-xs font-semibold opacity-90">{category?.name}</span>
          {discount > 0 && (
            <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold leading-snug decoration-2 underline-offset-4 group-hover:underline">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-black/60">{course.shortDescription}</p>

        {instructor && <p className="text-xs font-medium text-black/50">{instructor.name}</p>}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/50">
          {course.durationHours > 0 && <span>⏱ {course.durationHours} h</span>}
          {course.lessonsCount > 0 && <span>▶ {course.lessonsCount} lecciones</span>}
          {course.studentsCount > 0 && (
            <span>👥 {course.studentsCount.toLocaleString("es-EC")}</span>
          )}
        </div>

        {course.reviewsCount > 0 && (
          <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} />
        )}

        {!course.isFree && (
          <div className="mt-1">
            <CertBadge type={course.certType} />
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold">
              {course.isFree ? "Gratis" : formatUsd(course.price)}
            </span>
            {course.oldPrice && !course.isFree && (
              <span className="text-sm text-black/40 line-through">
                {formatUsd(course.oldPrice)}
              </span>
            )}
          </div>
          <span
            aria-hidden
            className="translate-x-0 text-lg font-bold transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
