import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">New post</h1>
      <div className="mt-6 max-w-2xl">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}
