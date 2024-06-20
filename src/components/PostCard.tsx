// components/PostCard.tsx

import { Post } from "@/types/Post";

type PostProps = {
  post: Post;
};

export default function PostCard({ post }: PostProps) {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="mt-0 mb-4 text-xl font-extrabold first-letter:uppercase">
        {post.title}
      </h2>
      <p className="text-gray-600 first-letter:uppercase">{post.body}</p>
    </div>
  );
}
