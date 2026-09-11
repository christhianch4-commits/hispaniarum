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
    default: "Hispaniarum — Capacítate y certifícate",
    template: "%s",
  },
  description:
    "Plataforma de capacitación en línea para profesionales y empresas de Ecuador, con certificados avalados por el Ministerio del Trabajo y certificados empresariales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`}>
      <body className="min-h-screen bg-white text-[#0a0a0a] font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
