import { randomBytes } from "crypto";

// Código legible tipo "HISP-7K2M-9XQP", sin caracteres ambiguos (0/O, 1/I).
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomBlock(length: number) {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export function generateCertificateCode() {
  return `HISP-${randomBlock(4)}-${randomBlock(4)}`;
}
