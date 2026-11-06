import Image from "next/image";

/** Logo de INGENIUMAN en círculo, con el borde grueso del estilo de la plataforma. */
export default function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logo-ingeniuman.webp"
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full border-2 border-black object-cover"
      style={{ width: size, height: size }}
    />
  );
}
