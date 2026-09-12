import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../PostForm";
import { updatePost, deletePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const boundUpdate = updatePost.bind(null, id);
  const boundDelete = deletePost.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Edit post</h1>
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-400 hover:underline">
            Delete
          </button>
        </form>
      </div>
      <div className="mt-6 max-w-2xl">
        <PostForm post={post} action={boundUpdate} />
      </div>
    </div>
  );
}
