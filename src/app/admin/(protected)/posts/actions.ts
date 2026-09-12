"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { PostStatus } from "@prisma/client";

function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function postDataFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    featuredImageUrl: String(formData.get("featuredImageUrl") ?? "").trim() || null,
    status: (formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT") as PostStatus,
    relatedServiceSlugs: parseListField(formData.get("relatedServiceSlugs")),
    relatedArticleSlugs: parseListField(formData.get("relatedArticleSlugs")),
    seoTitle: String(formData.get("seoTitle") ?? "").trim() || null,
    seoDescription: String(formData.get("seoDescription") ?? "").trim() || null,
  };
}

export async function createPost(formData: FormData) {
  const data = postDataFromForm(formData);
  const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

  await prisma.post.create({ data: { ...data, publishedAt } });

  revalidatePath("/admin/posts");
  revalidatePath("/resources");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const data = postDataFromForm(formData);
  const existing = await prisma.post.findUnique({ where: { id } });
  const publishedAt =
    data.status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt;

  await prisma.post.update({ where: { id }, data: { ...data, publishedAt } });

  revalidatePath("/admin/posts");
  revalidatePath("/resources");
  revalidatePath(`/${data.slug}`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({ where: { id } });

  revalidatePath("/admin/posts");
  revalidatePath("/resources");
  revalidatePath(`/${post.slug}`);
  redirect("/admin/posts");
}
