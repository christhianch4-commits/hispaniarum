/**
 * Añade el parámetro de origen `src` a un enlace de Hotmart, para poder ver en
 * los reportes de ventas cuántas vienen desde esta plataforma. Conserva el
 * resto de parámetros (p. ej. `off` del plan equipos). Verifica en la cuenta
 * de Hotmart que el origen aparezca en el reporte de ventas.
 */
export function hotmartUrl(url: string, source = "ingeniuacademy") {
  try {
    const u = new URL(url);
    u.searchParams.set("src", source);
    return u.toString();
  } catch {
    return url;
  }
}

/** 49 -> "US$49", 39.8 -> "US$39,80" */
export function formatUsd(value: number) {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  const text = hasCents ? value.toFixed(2).replace(".", ",") : String(Math.round(value));
  return "US$" + text;
}
