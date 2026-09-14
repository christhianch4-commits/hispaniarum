import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, SectionHeading } from "@/app/components/ui";
import { getAllCourses } from "@/lib/queries/courses";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Carrito | Hispaniarum",
};

export default async function CarritoPage() {
  const courses = await getAllCourses();
  // Semilla de demo: los dos primeros cursos, para mostrar el flujo de
  // inscripción sin necesidad de haber pasado antes por el catálogo.
  const seedItems = courses.slice(0, 2);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Carrito"
          title={
            <>
              Tu <Highlight color="#FF6B7A">carrito</Highlight>
            </>
          }
        />
        <div className="mt-10">
          <CartClient initialItems={seedItems} />
        </div>
      </main>
      <Footer />
    </>
  );
}
