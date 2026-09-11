import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paperfolio - Portfolio Landing Page",
  description: "Portafolio personal basado en el template Paperfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`}>
      <body className="min-h-screen bg-white text-[#0a0a0a] font-sans">
        {children}
      </body>
    </html>
  );
}
