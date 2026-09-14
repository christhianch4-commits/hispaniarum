import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import type { CertType } from "@/app/data/courses";

const CERT_LABELS: Record<CertType, string> = {
  mdt: "Certificado avalado ante el Ministerio del Trabajo del Ecuador",
  empresarial: "Certificado empresarial Hispaniarum",
  ambos: "Certificado avalado ante el Ministerio del Trabajo + Certificado empresarial",
};

const CERT_COLORS: Record<CertType, [number, number, number]> = {
  mdt: [0x16 / 255, 0xa3 / 255, 0x4a / 255],
  empresarial: [0x2f / 255, 0x81 / 255, 0xf7 / 255],
  ambos: [0x63 / 255, 0x66 / 255, 0xf1 / 255],
};

export type CertificateData = {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  durationHours: number;
  certType: CertType;
  code: string;
  issuedAt: Date;
  verifyUrl: string;
};

export async function buildCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([842, 595]); // A4 landscape (pt)
  const { width, height } = page.getSize();

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const [r, g, b] = CERT_COLORS[data.certType];
  const black = rgb(0, 0, 0);
  const gray = rgb(0.42, 0.42, 0.42);

  // Fondo blanco + marco negro estilo "paper"
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: black,
    borderWidth: 3,
  });
  // Barra de acento superior (color según tipo de certificado)
  page.drawRectangle({
    x: 24,
    y: height - 24 - 10,
    width: width - 48,
    height: 10,
    color: rgb(r, g, b),
  });

  const centerX = width / 2;

  // Marca
  page.drawText("HISPANIARUM", {
    x: centerX - bold.widthOfTextAtSize("HISPANIARUM", 14) / 2,
    y: height - 90,
    size: 14,
    font: bold,
    color: black,
  });

  // Título
  const title = "Certificado de Finalización";
  page.drawText(title, {
    x: centerX - bold.widthOfTextAtSize(title, 28) / 2,
    y: height - 150,
    size: 28,
    font: bold,
    color: black,
  });

  const given = "Se otorga el presente certificado a";
  page.drawText(given, {
    x: centerX - regular.widthOfTextAtSize(given, 12) / 2,
    y: height - 195,
    size: 12,
    font: regular,
    color: gray,
  });

  // Nombre del estudiante
  const nameSize = 30;
  page.drawText(data.studentName, {
    x: centerX - bold.widthOfTextAtSize(data.studentName, nameSize) / 2,
    y: height - 240,
    size: nameSize,
    font: bold,
    color: rgb(r, g, b),
  });

  const forCourse = "por haber completado satisfactoriamente el curso";
  page.drawText(forCourse, {
    x: centerX - regular.widthOfTextAtSize(forCourse, 12) / 2,
    y: height - 280,
    size: 12,
    font: regular,
    color: gray,
  });

  // Título del curso
  const courseSize = 18;
  const courseLines = wrapText(data.courseTitle, bold, courseSize, width - 200);
  let courseY = height - 310;
  for (const line of courseLines) {
    page.drawText(line, {
      x: centerX - bold.widthOfTextAtSize(line, courseSize) / 2,
      y: courseY,
      size: courseSize,
      font: bold,
      color: black,
    });
    courseY -= courseSize + 6;
  }

  // Tipo de certificado
  const certLabel = CERT_LABELS[data.certType];
  page.drawText(certLabel, {
    x: centerX - italic.widthOfTextAtSize(certLabel, 11) / 2,
    y: courseY - 14,
    size: 11,
    font: italic,
    color: rgb(r, g, b),
  });

  // Pie: fecha, horas, instructor (izquierda) — código + QR (derecha)
  const footerY = 90;
  const dateStr = data.issuedAt.toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  page.drawLine({
    start: { x: 70, y: footerY + 34 },
    end: { x: 300, y: footerY + 34 },
    thickness: 1,
    color: gray,
  });
  page.drawText(data.instructorName, {
    x: 70,
    y: footerY + 18,
    size: 11,
    font: bold,
    color: black,
  });
  page.drawText("Instructor del curso", {
    x: 70,
    y: footerY + 4,
    size: 9,
    font: regular,
    color: gray,
  });

  page.drawText(`Emitido el ${dateStr}`, {
    x: 70,
    y: footerY - 24,
    size: 10,
    font: regular,
    color: gray,
  });
  page.drawText(`Duración: ${data.durationHours} horas académicas`, {
    x: 70,
    y: footerY - 40,
    size: 10,
    font: regular,
    color: gray,
  });

  // QR + código de verificación (derecha)
  const qrSize = 84;
  const qrDataUrl = await QRCode.toDataURL(data.verifyUrl, {
    margin: 0,
    color: { dark: "#000000", light: "#ffffff" },
  });
  const qrPngBytes = dataUrlToUint8Array(qrDataUrl);
  const qrImage = await doc.embedPng(qrPngBytes);
  const qrX = width - 70 - qrSize;
  const qrY = footerY - 46;

  page.drawRectangle({
    x: qrX - 6,
    y: qrY - 6,
    width: qrSize + 12,
    height: qrSize + 12,
    borderColor: black,
    borderWidth: 1.5,
  });
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });

  page.drawText("Código de verificación", {
    x: qrX + qrSize / 2 - regular.widthOfTextAtSize("Código de verificación", 8) / 2,
    y: qrY + qrSize + 16,
    size: 8,
    font: regular,
    color: gray,
  });
  page.drawText(data.code, {
    x: qrX + qrSize / 2 - bold.widthOfTextAtSize(data.code, 11) / 2,
    y: qrY - 16,
    size: 11,
    font: bold,
    color: black,
  });

  return doc.save();
}

function wrapText(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  return Uint8Array.from(Buffer.from(base64, "base64"));
}
