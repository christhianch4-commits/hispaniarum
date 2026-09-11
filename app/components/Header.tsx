"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
];

const pagesLinks = [
  "Contact",
  "Single Project",
  "Style Guide",
  "404 Not Found",
];

export default function Header() {
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto flex w-fit items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-2 shadow-[0_2px_0_0_rgba(0,0,0,1)]">
      <Link
        href="#home"
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black"
        aria-label="Inicio"
      >
        <span className="block h-3 w-3 rounded-full border-2 border-black" />
      </Link>

      <nav className="hidden items-center gap-1 sm:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            {link.label}
          </a>
        ))}

        <div className="relative">
          <button
            type="button"
            onClick={() => setPagesOpen((v) => !v)}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            Pages
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
          {pagesOpen && (
            <ul className="absolute top-full left-1/2 mt-2 w-48 -translate-x-1/2 rounded-2xl border-2 border-black bg-white p-2 text-sm shadow-[0_2px_0_0_rgba(0,0,0,1)]">
              {pagesLinks.map((p) => (
                <li key={p}>
                  <a
                    href="#"
                    className="block rounded-xl px-3 py-2 hover:bg-black/5"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href="#cart"
          className="rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5"
        >
          Cart(0)
        </a>
      </nav>

      <a
        href="#contact"
        className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
        aria-label="Contacto"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </header>
  );
}
