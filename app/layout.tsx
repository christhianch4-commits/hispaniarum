import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Providers from "@/app/providers";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "INGENIUACADEMY — Capacitación técnica por INGENIUMAN",
    template: "%s",
  },
  description:
    "Capacitación técnica por INGENIUMAN: cursos para profesionales y empresas, con certificados verificables en línea y programas con certificación del Ministerio del Trabajo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`}>
      <body className="min-h-screen bg-white text-black font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
