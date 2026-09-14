import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, SectionHeading } from "@/app/components/ui";
import CatalogClient from "@/app/cursos/CatalogClient";
import { getAllCourses } from "@/lib/queries/courses";

export const metadata: Metadata = {
  title: "Cursos | Hispaniarum",
  description: "Explora el catálogo completo de cursos de Hispaniarum.",
};

export default async function CursosPage() {
  const courses = await getAllCourses();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Catálogo completo"
          title={
            <>
              Encuentra el curso{" "}
              <Highlight color="#FF6B7A">ideal para ti</Highlight>
            </>
          }
          description="Filtra por categoría, nivel o busca directamente por tema."
        />

        <div className="mt-10">
          <Suspense fallback={null}>
            <CatalogClient courses={courses} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
