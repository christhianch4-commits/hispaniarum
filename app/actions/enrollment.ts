"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function checkoutAction(courseSlugs: string[]) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, redirectTo: "/login" };
  }

  for (const slug of courseSlugs) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseSlug: { userId: session.user.id, courseSlug: slug },
      },
      update: {},
      create: { userId: session.user.id, courseSlug: slug },
    });
  }

  revalidatePath("/dashboard");
  return { ok: true as const };
}

export async function advanceProgressAction(enrollmentId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });
  if (!enrollment || enrollment.userId !== session.user.id) return;

  const nextProgress = Math.min(100, enrollment.progress + 25);

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress: nextProgress,
      completedAt: nextProgress === 100 ? new Date() : null,
    },
  });

  revalidatePath("/dashboard");
}
