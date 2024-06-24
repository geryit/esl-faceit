"use client";
import { useEffect, useMemo, useRef } from "react";
import PostCard from "./PostCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPosts, fetchUsers } from "@/lib/features/posts/postsSlice";
import useInView from "@/hooks/useInView";
import useRealTimePost from "@/hooks/useRealTimePost";

// PostList component fetches posts and users from the store
export default function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const users = useAppSelector((state) => state.posts.users);
  const postStatus = useAppSelector((state) => state.posts.status);
  const page = useAppSelector((state) => state.posts.page);
  const hasMoreData = useAppSelector((state) => state.posts.hasMoreData);
  const scrollTrigger = useRef(null);

  useEffect(() => {
    // Fetch the initial posts and dispatch
    if (postStatus === "idle") {
      dispatch(fetchPosts(page));
    }
  }, [postStatus, dispatch, page]);

  // Fetch users for the posts and dispatch
  useEffect(() => {
    const uniqUserIds = [...new Set(posts.map((p) => p.userId))];

    const onlyNewUserIds = uniqUserIds.filter((userId) => !users[userId]);

    dispatch(fetchUsers(onlyNewUserIds));
  }, [dispatch, posts, users]);

  // Fetch more posts when the user scrolls to the bottom of the page
  // scrollTrigger is a ref to the loading div at the bottom of the page
  useInView(dispatch, page, scrollTrigger);

  // Mock a real time post using WebSocket
  const [sendRealTimePost, realtimePost] = useRealTimePost();

  const user = useMemo(
    () => (realtimePost?.userId ? users[realtimePost?.userId] : undefined),
    [realtimePost?.userId, users]
  );

  return (
    <div>
      <button
        onClick={sendRealTimePost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add a real time post
      </button>
      <div className="flex flex-col gap-2">
        {realtimePost && <PostCard post={realtimePost} user={user} />}

        {posts?.map((post, i) => (
          <PostCard
            key={i}
            post={post}
            user={post?.userId ? users[post?.userId] : undefined}
          />
        ))}
      </div>
      {hasMoreData && (
        <div className="text-center mt-5 p-4" ref={scrollTrigger}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
