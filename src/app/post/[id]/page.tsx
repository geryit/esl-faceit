"use client";

import { fetchSinglePost, fetchUsers } from "@/lib/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { use, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostCard({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { id } = params;
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  const post = posts.find((p) => p.id === Number(id));

  const user = useAppSelector((state) =>
    post?.userId ? state.posts.users[post?.userId] : null
  );

  useEffect(() => {
    if (id && !post) {
      dispatch(fetchSinglePost(Number(id)));
    }
  }, [id, dispatch, post]);

  useEffect(() => {
    if (!post || user?.id) return;
    dispatch(fetchUsers([post?.userId]));
  }, [dispatch, post, user?.id]);

  const handleOnBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!post || !user) {
    return <div className="text-center p-8">Loading...</div>;
  }
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <button onClick={handleOnBack} className="underline font-semibold">
        ← Back to posts
      </button>
      <div className="p-4 bg-gray-100 flex gap-4 mt-4">
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
          <p className="text-gray-600 first-letter:uppercase">{post.body}</p>
        </div>
      </div>
    </div>
  );
}
