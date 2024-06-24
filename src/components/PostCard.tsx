import React, { memo } from "react";
import type { Post } from "@/types/Post";
import type { User } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
import truncate from "@/utils/truncate";
import PostCardPlaceHolder from "@/components/PostCardPlaceHolder";

type Props = {
  post?: Post;
  user?: User;
  isSinglePage?: boolean; // If a single post component in dynamic route (eg: /post/[id].tsx)
};

function PostCard({ post, user, isSinglePage = false }: Props) {
  const isNewPost = post?.id === 0; // If a real time post added with WebSocket.
  return !post || !user ? (
    <PostCardPlaceHolder />
  ) : (
    <Link
      href={!isNewPost ? `/post/${post.id}` : ""} // Prevent routing if a real time post.
      scroll={false}
      className={`rounded p-4 bg-gray-100  transition duration-300 flex gap-4 ${
        isNewPost ? "animate-highlight" : ""
      } ${!isSinglePage ? "hover:bg-gray-200" : "cursor-default"}`}
    >
      <div>
        <Image
          src={`https://i.pravatar.cc/160?u=${user?.id}`}
          alt={user?.name || ""}
          width={80}
          height={80}
          className="rounded"
        />
      </div>

      <div className="flex-1">
        <h2 className="mb-2 text-xl font-extrabold first-letter:uppercase">
          {user?.name}
        </h2>
        <p className="text-gray-600 first-letter:uppercase">
          {truncate(post.body)}
        </p>
      </div>
    </Link>
  );
}

export default memo(PostCard);
