"use client";
import { useCallback, useEffect, useState } from "react";
import { FEED_PER_PAGE } from "@/config/constants";
import { getFeeds } from "@/actions/getFeeds";
import FeedCard from "./PostCard";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPosts, fetchUsers } from "@/lib/features/posts/postsSlice";
import uniqBy from "lodash.uniqby";
import type { Post } from "@/types/Post";
import isJsonString from "@/utils/isJsonString";
import useWs from "@/hooks/ws";

export default function PostList() {
  const [offset, setOffset] = useState(FEED_PER_PAGE);
  // const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const users = useAppSelector((state) => state.posts.users);
  const postStatus = useAppSelector((state) => state.posts.status);
  const usersStatus = useAppSelector((state) => state.posts.usersStatus);
  const page = useAppSelector((state) => state.posts.page);
  const hasMoreData = useAppSelector((state) => state.posts.hasMoreData);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts(page));
    }
  }, [postStatus, dispatch, page]);

  const [scrollTrigger, isInView] = useInView();

  useEffect(() => {
    const uniqUserIds = [...new Set(posts.map((p) => p.userId))];

    const onlyNewUserIds = uniqUserIds.filter((userId) => !users[userId]);

    dispatch(fetchUsers(onlyNewUserIds));
  }, [dispatch, posts, users]);

  // const loadMoreFeeds = useCallback(async () => {
  //   if (hasMoreData) {
  //     const apiFeeds = await getFeeds(offset, FEED_PER_PAGE);

  //     if (!apiFeeds.length) {
  //       setHasMoreData(false);
  //     }

  //     setFeeds((prevFeeds) => [...prevFeeds, ...apiFeeds]);
  //     setOffset((prevOffset) => prevOffset + FEED_PER_PAGE);
  //   }
  // }, [offset, hasMoreData]);

  // useEffect(() => {
  //   if (isInView && hasMoreData) {
  //     loadMoreFeeds();
  //   }
  // }, [isInView, hasMoreData, loadMoreFeeds]);

  const [newPost, setNewPost] = useState<Post>();

  useWs(setNewPost);

  return (
    <>
      <div className="flex flex-col gap-2">
        {[newPost, ...posts]?.map(
          (post) =>
            post && (
              <FeedCard key={post.id} post={post} user={users[post.userId]} />
            )
        )}
      </div>
      <div className="text-center mt-5">
        {/* {hasMoreData && <div ref={scrollTrigger}>Loading...</div>} */}
        {hasMoreData && (
          <button
            className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
            onClick={() => {
              if (postStatus === "loading") return;
              dispatch(fetchPosts(page));
            }}
          >
            Load More Posts
          </button>
        )}
      </div>
    </>
  );
}
