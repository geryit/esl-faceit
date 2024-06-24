"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PostCard from "./PostCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPosts, fetchUsers } from "@/lib/features/posts/postsSlice";
import type { Post } from "@/types/Post";
import useWebSocket from "react-use-websocket";
import isJsonString from "@/utils/isJsonString";

export default function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const users = useAppSelector((state) => state.posts.users);
  const postStatus = useAppSelector((state) => state.posts.status);
  const page = useAppSelector((state) => state.posts.page);
  const hasMoreData = useAppSelector((state) => state.posts.hasMoreData);
  const scrollTrigger = useRef(null);
  const { sendMessage, lastMessage } = useWebSocket("wss://echo.websocket.org");

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts(page));
    }
  }, [postStatus, dispatch, page]);

  useEffect(() => {
    const uniqUserIds = [...new Set(posts.map((p) => p.userId))];

    const onlyNewUserIds = uniqUserIds.filter((userId) => !users[userId]);

    dispatch(fetchUsers(onlyNewUserIds));
  }, [dispatch, posts, users]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPosts(page));
        }
      },
      { threshold: 1 }
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [dispatch, page]);

  const realtimePost = useMemo(() => {
    const data = isJsonString(lastMessage?.data)
      ? JSON.parse(lastMessage?.data)
      : undefined;

    if (data?.type === "realtimePost") return data;
  }, [lastMessage?.data]);

  const sendRealTimePost = useCallback(() => {
    sendMessage(
      JSON.stringify({
        type: "realtimePost",
        id: 0,
        title: "Real-Time Post",
        body: "This is a real-time post received via WebSocket.",
        userId: 1,
      })
    );
  }, [sendMessage]);


  return (
    <div>
      <button
        onClick={sendRealTimePost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add a real time post
      </button>
      <div className="flex flex-col gap-2">
        {realtimePost && (
          <PostCard
            post={realtimePost}
            user={
              realtimePost?.userId ? users[realtimePost?.userId] : undefined
            }
          />
        )}

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
