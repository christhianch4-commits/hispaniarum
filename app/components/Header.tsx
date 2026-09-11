"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { categories } from "@/app/data/categories";
import { brand } from "@/app/data/site";

const navLinks = [
  { label: "Cursos", href: "/cursos" },
  { label: "Empresas", href: "/empresas" },
  { label: "Certificaciones", href: "/certificaciones" },
  { label: "Precios", href: "/precios" },
];

export default function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const firstName = session?.user?.name?.split(" ")[0];

  // El login/registro ocurre en una Server Action: el SessionProvider del
  // layout (que persiste entre navegaciones) no se entera solo. Al cambiar
  // de ruta, forzamos un refetch puntual (una vez por navegación, no en loop).
  const pathname = usePathname();
  const updateRef = useRef(update);
  useEffect(() => {
    updateRef.current = update;
  }, [update]);
  useEffect(() => {
    updateRef.current();
  }, [pathname]);

  return (
    <header className="sticky top-4 z-50 mx-auto flex w-fit max-w-[95vw] items-center gap-1 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[0_2px_0_0_rgba(0,0,0,1)]">
      <Link href="/" className="flex items-center gap-2 pl-1 pr-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black text-xs font-black">
          H
        </span>
        <span className="hidden text-sm font-extrabold sm:block">
          {brand.name}
        </span>
      </Link>

      <nav className="hidden items-center gap-1 lg:flex">
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoriesOpen((v) => !v)}
            onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            Categorías
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {categoriesOpen && (
            <ul className="absolute top-full left-0 mt-2 grid w-72 grid-cols-1 gap-0.5 rounded-2xl border-2 border-black bg-white p-2 text-sm shadow-[0_2px_0_0_rgba(0,0,0,1)]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cursos?categoria=${c.slug}`}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-black/5"
                  >
                    <span>{c.icon}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 pl-1 sm:flex">
        <Link
          href="/carrito"
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black"
          aria-label="Carrito"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1.4" fill="currentColor" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" />
          </svg>
        </Link>
        {status === "authenticated" ? (
          <>
            <Link
              href="/dashboard"
              className="rounded-full px-3 py-2 text-sm font-medium hover:bg-black/5"
            >
              Hola, {firstName}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="paper-btn whitespace-nowrap bg-black px-4 py-2 text-sm text-white"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium hover:bg-black/5"
            >
              Ingresar
            </Link>
            <Link
              href="/registro"
              className="paper-btn whitespace-nowrap bg-black px-4 py-2 text-sm text-white"
            >
              Regístrate
            </Link>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black lg:hidden"
        aria-label="Menú"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 mt-2 w-[90vw] max-w-sm rounded-3xl border-2 border-black bg-white p-4 text-sm shadow-[0_3px_0_0_rgba(0,0,0,1)] lg:hidden">
          <p className="mb-2 px-2 text-xs font-semibold uppercase text-black/40">
            Categorías
          </p>
          <div className="mb-3 grid grid-cols-1 gap-0.5">
            {categories.slice(0, 5).map((c) => (
              <Link
                key={c.slug}
                href={`/cursos?categoria=${c.slug}`}
                className="rounded-xl px-3 py-2 hover:bg-black/5"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
          <div className="mb-3 grid grid-cols-1 gap-0.5 border-t border-black/10 pt-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-2 font-medium hover:bg-black/5"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/carrito"
              className="rounded-xl px-3 py-2 font-medium hover:bg-black/5"
            >
              Carrito
            </Link>
          </div>
          <div className="flex gap-2 border-t border-black/10 pt-3">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex-1 rounded-full border-2 border-black px-4 py-2 text-center font-medium"
                >
                  Mi panel
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex-1 rounded-full bg-black px-4 py-2 text-center font-medium text-white"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex-1 rounded-full border-2 border-black px-4 py-2 text-center font-medium"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  className="flex-1 rounded-full bg-black px-4 py-2 text-center font-medium text-white"
                >
                  Regístrate
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
