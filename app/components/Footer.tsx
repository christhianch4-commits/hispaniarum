import Link from "next/link";
import { brand, footerLinks } from "@/app/data/site";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black text-xs">
              H
            </span>
            {brand.name}
          </div>
          <p className="max-w-xs text-sm text-black/60">{brand.description}</p>
        </div>

        <LinkColumn title="Plataforma" links={footerLinks.plataforma} />
        <LinkColumn title="Empresas" links={footerLinks.empresas} />

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${brand.email}`} className="hover:underline">
                {brand.email}
              </a>
            </li>
            <li>{brand.phone}</li>
            <li>
              <Link href="/login" className="hover:underline">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link href="/registro" className="hover:underline">
                Crear cuenta
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-black/10 pt-6 text-xs text-black/40 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {brand.name}. Todos los derechos
          reservados.
        </span>
        <span>Hecho con Next.js.</span>
      </div>
    </footer>
  );
}
