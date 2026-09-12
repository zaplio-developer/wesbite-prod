import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90"
        >
          New post
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border">
        {posts.length === 0 && (
          <p className="p-6 text-sm text-muted">No posts yet.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="flex items-center justify-between p-4 hover:bg-surface-hover"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{post.title}</p>
              <p className="text-xs text-muted">/{post.slug}</p>
            </div>
            <span
              className={
                post.status === "PUBLISHED"
                  ? "rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  : "rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-muted"
              }
            >
              {post.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
