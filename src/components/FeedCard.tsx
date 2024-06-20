import type { Feed } from "@/types/Feed";

type Props = {
  feed: Feed;
};

export default function FeedCard({ feed }: Props) {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="mb-4 text-xl font-extrabold first-letter:uppercase">
        {feed.title}
      </h2>
      <p className="text-gray-600 first-letter:uppercase">{feed.body}</p>
    </div>
  );
}
