import Link from "next/link";
import type { CertType } from "@/app/data/courses";

/** "text-white" o "text-black" según el contraste con el color de fondo. */
export function readableText(color: string) {
  const hex = color.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? "text-black" : "text-white";
}

export function Highlight({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  // Texto oscuro sobre fondos claros (amarillo, cian) para mantener contraste.
  const textClass = readableText(color);
  return (
    <span
      className={`inline-block rounded-lg px-2 ${textClass}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={
        "inline-block rounded-md px-2 py-0.5 text-xs font-semibold " +
        (tone === "dark" ? "bg-black text-white" : "bg-black/5 text-black")
      }
    >
      {children}
    </span>
  );
}

export function RatingStars({
  rating,
  reviewsCount,
}: {
  rating: number;
  reviewsCount?: number;
}) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="font-bold">{rating.toFixed(1)}</span>
      <span aria-hidden className="text-[#FFC224]">
        {"★★★★★".slice(0, Math.round(rating))}
        <span className="text-black/20">
          {"★★★★★".slice(Math.round(rating))}
        </span>
      </span>
      {typeof reviewsCount === "number" && (
        <span className="text-black/50">({reviewsCount})</span>
      )}
    </div>
  );
}

const certConfig: Record<
  CertType,
  { label: string; color: string }
> = {
  mdt: { label: "Aval Ministerio del Trabajo", color: "#16A34A" },
  empresarial: { label: "Certificado empresarial", color: "#0071BC" },
  ambos: { label: "MDT + Empresarial", color: "#00B8D9" },
};

export function CertBadge({ type }: { type: CertType }) {
  const cfg = certConfig[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-semibold text-black"
    >
      <span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: cfg.color }}
      />
      {cfg.label}
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  const tone =
    variant === "dark" ? "bg-black text-white" : "bg-white text-black";
  return (
    <Link
      href={href}
      className={`paper-btn inline-block px-6 py-3 text-sm ${tone} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={
        "paper-btn inline-block border-2 border-black px-6 py-3 text-sm " +
        className
      }
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/40">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-black/60">{description}</p>}
    </div>
  );
}
