"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type LeadState =
  | { error?: string; success?: undefined }
  | { error?: undefined; success: { name: string; company: string } }
  | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function submitCompanyLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Campo trampa para bots: las personas no lo ven ni lo llenan.
  if (clean(formData.get("website"), 100)) return { success: { name: "", company: "" } };

  const name = clean(formData.get("name"), 120);
  const company = clean(formData.get("company"), 160);
  const email = clean(formData.get("email"), 200).toLowerCase();
  const teamSize = clean(formData.get("teamSize"), 60);
  const message = clean(formData.get("message"), 1500);

  if (!name || !company) return { error: "Indica tu nombre y el de tu empresa." };
  if (!EMAIL_RE.test(email)) return { error: "Revisa que el correo sea válido." };

  await prisma.lead.create({
    data: {
      type: "empresa",
      name,
      company,
      email,
      teamSize: teamSize || null,
      message: message || null,
    },
  });

  revalidatePath("/admin/leads");
  return { success: { name, company } };
}

export async function subscribeNewsletter(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  if (clean(formData.get("website"), 100)) return { success: { name: "", company: "" } };

  const email = clean(formData.get("email"), 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Revisa que el correo sea válido." };

  const existing = await prisma.lead.findFirst({ where: { type: "newsletter", email } });
  if (!existing) {
    await prisma.lead.create({ data: { type: "newsletter", email } });
    revalidatePath("/admin/leads");
  }
  return { success: { name: "", company: "" } };
}

export async function deleteLeadAction(leadId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") return { error: "No autorizado." };

  await prisma.lead.delete({ where: { id: leadId } }).catch(() => null);
  revalidatePath("/admin/leads");
  return { ok: true as const };
}
