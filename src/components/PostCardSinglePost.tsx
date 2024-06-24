import React, { memo } from "react";
import type { Post } from "@/types/Post";
import type { User } from "@/types/User";
import Image from "next/image";

type Props = {
  post?: Post;
  user?: User;
};

function PostCardSinglePost({ post, user }: Props) {
  return !post || !user ? (
    <div>Loading...</div>
  ) : (
    <div className="rounded p-4 bg-gray-100  transition duration-300 gap-4">
      <div className="flex justify-center">
        <Image
          src={`https://i.pravatar.cc/320?u=${user?.id}`}
          alt={user?.name || ""}
          width={160}
          height={160}
          className="rounded"
        />
      </div>

      <h2 className="mt-4 text-xl font-extrabold first-letter:uppercase text-center">
        {user?.name}
      </h2>
      <p className="text-gray-600 first-letter:uppercase mt-2">{post.body}</p>
    </div>
  );
}

export default memo(PostCardSinglePost);
