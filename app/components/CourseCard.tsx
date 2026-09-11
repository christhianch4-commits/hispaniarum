import Link from "next/link";
import type { Course } from "@/app/data/courses";
import { getInstructor } from "@/app/data/instructors";
import { CertBadge, RatingStars, Tag } from "@/app/components/ui";

export default function CourseCard({ course }: { course: Course }) {
  const instructor = getInstructor(course.instructorSlug);

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="paper-card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
    >
      <div
        className="relative flex h-36 items-end justify-between p-4"
        style={{ backgroundColor: course.color }}
      >
        <Tag>{course.level}</Tag>
        {course.oldPrice && (
          <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(100 - (course.price / course.oldPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold leading-snug group-hover:underline">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-black/60">
          {course.shortDescription}
        </p>

        {instructor && (
          <p className="text-xs text-black/50">{instructor.name}</p>
        )}

        <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} />

        <div className="mt-1">
          <CertBadge type={course.certType} />
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-extrabold">${course.price}</span>
          {course.oldPrice && (
            <span className="text-sm text-black/40 line-through">
              ${course.oldPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
