import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AuthForm from "@/app/components/AuthForm";

export const metadata: Metadata = {
  title: "Crear cuenta | Hispaniarum",
};

export default function RegistroPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-md flex-col px-6 py-20">
        <AuthForm mode="registro" />
      </main>
      <Footer />
    </>
  );
}
