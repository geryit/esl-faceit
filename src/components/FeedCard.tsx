import type { Feed } from "@/types/Feed";

type Props = {
  post: Feed;
};

export default function FeedCard({ post }: Props) {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="mb-4 text-xl font-extrabold first-letter:uppercase">
        {post.title}
      </h2>
      <p className="text-gray-600 first-letter:uppercase">{post.body}</p>
    </div>
  );
}
