import type { Post } from "@prisma/client";

export function PostForm({
  post,
  action,
}: {
  post?: Post;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const field = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const label = "text-sm font-medium text-foreground";

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="title">Title</label>
          <input className={field} id="title" name="title" defaultValue={post?.title} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="slug">Slug</label>
          <input className={field} id="slug" name="slug" defaultValue={post?.slug} required />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={label} htmlFor="excerpt">Excerpt</label>
        <textarea className={field} id="excerpt" name="excerpt" defaultValue={post?.excerpt} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="category">Category</label>
          <input className={field} id="category" name="category" defaultValue={post?.category} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="author">Author</label>
          <input className={field} id="author" name="author" defaultValue={post?.author} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="status">Status</label>
          <select className={field} id="status" name="status" defaultValue={post?.status ?? "DRAFT"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={label} htmlFor="featuredImageUrl">Featured image URL (optional)</label>
        <input className={field} id="featuredImageUrl" name="featuredImageUrl" defaultValue={post?.featuredImageUrl ?? ""} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={label} htmlFor="content">Content (Markdown)</label>
        <textarea
          className={`${field} min-h-64 font-mono`}
          id="content"
          name="content"
          defaultValue={post?.content}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="relatedServiceSlugs">Related service slugs (comma-separated)</label>
          <input
            className={field}
            id="relatedServiceSlugs"
            name="relatedServiceSlugs"
            defaultValue={post?.relatedServiceSlugs.join(", ")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="relatedArticleSlugs">Related article slugs (comma-separated)</label>
          <input
            className={field}
            id="relatedArticleSlugs"
            name="relatedArticleSlugs"
            defaultValue={post?.relatedArticleSlugs.join(", ")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="seoTitle">SEO title (optional)</label>
          <input className={field} id="seoTitle" name="seoTitle" defaultValue={post?.seoTitle ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label} htmlFor="seoDescription">SEO description (optional)</label>
          <input className={field} id="seoDescription" name="seoDescription" defaultValue={post?.seoDescription ?? ""} />
        </div>
      </div>

      <button
        type="submit"
        className="self-start rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
      >
        Save
      </button>
    </form>
  );
}
