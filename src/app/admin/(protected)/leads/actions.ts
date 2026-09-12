"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleContactHandled(id: string, handled: boolean) {
  await prisma.contactSubmission.update({ where: { id }, data: { handled: !handled } });
  revalidatePath("/admin/leads");
}

export async function togglePraxisHandled(id: string, handled: boolean) {
  await prisma.praxisApplication.update({ where: { id }, data: { handled: !handled } });
  revalidatePath("/admin/leads");
}
