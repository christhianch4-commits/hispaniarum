import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, SectionHeading } from "@/app/components/ui";
import { getAllCourses } from "@/lib/queries/courses";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Carrito | INGENIUACADEMY",
};

export default async function CarritoPage() {
  const courses = await getAllCourses();
  // Los cursos de Hotmart se compran en su propio checkout, no en este carrito.
  // Semilla de demo: los dos primeros cursos propios de pago.
  const seedItems = courses
    .filter((c) => c.channel !== "hotmart" && !c.isFree)
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Carrito"
          title={
            <>
              Tu <Highlight color="#D62828">carrito</Highlight>
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
