import React, { memo } from "react";
import type { Post } from "@/types/Post";
import type { User } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
import truncate from "@/utils/truncate";

type Props = {
  post: Post;
  user: User;
};

function PostCard({ post, user }: Props) {
  const isNewPost = post.id === 0;
  return (
    user && (
      <Link
        href={`/post/${post.id}`}
        className={`p-8 bg-gray-100 flex gap-4 ${
          isNewPost ? "animate-highlight" : ""
        }`}
      >
        <div>
          <Image
            src={`https://i.pravatar.cc/160?u=${user.id}`}
            alt={user.name}
            width={80}
            height={80}
            className="rounded"
          />
        </div>

        <div className="flex-1">
          <h2 className="mb-4 text-xl font-extrabold first-letter:uppercase">
            {user.name} - {post.title}
          </h2>
          <p className="text-gray-600 first-letter:uppercase">
            {truncate(post.body)}
          </p>
        </div>
      </Link>
    )
  );
}

export default memo(PostCard);
