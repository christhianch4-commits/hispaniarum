import Link from "next/link";
import type { Category } from "@/app/data/categories";
import { getCoursesByCategory } from "@/app/data/courses";

export default function CategoryCard({ category }: { category: Category }) {
  const count = getCoursesByCategory(category.slug).length;

  return (
    <Link
      href={`/cursos?categoria=${category.slug}`}
      className="paper-card group flex flex-col gap-3 p-5 transition-transform hover:-translate-y-1"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black text-2xl"
        style={{ backgroundColor: category.color + "22" }}
      >
        {category.icon}
      </span>
      <h3 className="font-bold leading-snug group-hover:underline">
        {category.name}
      </h3>
      <p className="text-sm text-black/60">{category.description}</p>
      <p className="mt-auto text-xs font-semibold text-black/40">
        {count} {count === 1 ? "curso" : "cursos"}
      </p>
    </Link>
  );
}
