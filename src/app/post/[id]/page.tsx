"use client";

import { fetchSinglePost, fetchUsers } from "@/lib/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";

export default function SinglePost({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { id } = params;
  const dispatch = useAppDispatch();

  // If posts already fetched before, get the post from the store
  const posts = useAppSelector((state) => state.posts.posts);

  // Get the post from the store
  const post = posts.find((p) => p.id === Number(id));

  // Fetch the user for the post
  const user = useAppSelector((state) =>
    post?.userId ? state.posts.users[post?.userId] : undefined
  );

  // If post is not fetched, fetch the single post
  useEffect(() => {
    if (id && !post) {
      dispatch(fetchSinglePost(Number(id)));
    }
  }, [id, dispatch, post]);

  // Fetch the user for the post
  useEffect(() => {
    if (!post || user?.id) return;
    dispatch(fetchUsers([post?.userId]));
  }, [dispatch, post, user?.id]);

  // Go back to the previous page to the same scroll position
  const handleOnBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <button onClick={handleOnBack} className="underline font-semibold mb-4">
        ← Back to posts
      </button>
      <PostCard post={post} user={user} isSinglePage />
    </div>
  );
}
