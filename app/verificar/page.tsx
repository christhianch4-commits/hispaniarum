import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Highlight, SectionHeading } from "@/app/components/ui";
import VerifyForm from "./VerifyForm";

export const metadata: Metadata = {
  title: "Verificar certificado | Hispaniarum",
  description:
    "Verifica la autenticidad de un certificado emitido por Hispaniarum.",
};

export default function VerificarPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <SectionHeading
          eyebrow="Verificación pública"
          title={
            <>
              Verifica un <Highlight color="#16A34A">certificado</Highlight>
            </>
          }
          description="Ingresa el código que aparece en el certificado (o escanea su código QR) para confirmar que fue emitido por Hispaniarum."
        />

        <div className="mt-10 paper-card p-8">
          <VerifyForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
