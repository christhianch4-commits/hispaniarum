import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, SectionHeading } from "@/app/components/ui";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Carrito | Hispaniarum",
};

export default function CarritoPage() {
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
          <CartClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
