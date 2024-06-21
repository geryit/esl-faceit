"use client";
import { useCallback, useEffect, useState } from "react";
import { FEED_PER_PAGE } from "@/config/constants";
import { getFeeds } from "@/actions/getFeeds";
import FeedCard from "./FeedCard";
import { Feed } from "@/types/Feed";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchPosts,
  fetchUser,
  fetchUsers,
} from "@/lib/features/posts/postsSlice";
import uniqBy from "lodash.uniqby";
type Props = {
  initialFeeds: Feed[];
};

export default function FeedList({ initialFeeds }: Props) {
  const [offset, setOffset] = useState(FEED_PER_PAGE);
  const [feeds, setFeeds] = useState<Feed[]>(initialFeeds);
  // const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const users = useAppSelector((state) => state.posts.users);
  const postStatus = useAppSelector((state) => state.posts.status);
  const userStatus = useAppSelector((state) => state.posts.userStatus);
  const page = useAppSelector((state) => state.posts.page);
  const hasMoreData = useAppSelector((state) => state.posts.hasMoreData);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts(page));
    }
  }, [postStatus, dispatch, page]);

  const [scrollTrigger, isInView] = useInView();

  useEffect(() => {
    if (postStatus === "loading") return;

    const uniqUserIds = [...new Set(posts.map((p) => p.userId))];

    const onlyNewUserIds = uniqUserIds.filter((userId) => !users[userId]);

    console.log({ uniqUserIds, onlyNewUserIds, users });
    // uniqUserIds.map((userId) => {
    //   if (!users[userId]) {
    //     console.log(userId);
    //     dispatch(fetchUsers(userId));
    //   }
    // });

    dispatch(fetchUsers(onlyNewUserIds));
    // posts.map((post) => {
    //   console.log(post.userId);
    //   if (!users[post.userId]) {
    //     console.log(post.userId);
    //     dispatch(fetchUser(post.userId));
    //   }
    // })
  }, [posts, users, dispatch, postStatus, userStatus]);

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

  return (
    <>
      <div className="flex flex-col gap-2">
        {posts?.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
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
