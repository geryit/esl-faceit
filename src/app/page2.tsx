"use client";
import { getFeeds } from "@/actions/getFeeds";
import { FEED_PER_PAGE } from "@/config/constants";
import FeedList from "@/components/FeedList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPosts } from "@/lib/features/posts/postsSlice";
import { useEffect } from "react";

export default function Home() {
  // const initialFeeds = await getFeeds(0, FEED_PER_PAGE);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const postStatus = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts(1));
    }
  }, [postStatus, dispatch]);

  console.log({ posts });

  // useEffect(() => {
  //   socket.on("new-post", (post) => {
  //     dispatch(addPost(post));
  //   });

  //   return () => {
  //     socket.off("new-post");
  //   };
  // }, [dispatch]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">
          Loading feeds asynchronously
        </h1>

        <h3 className="text-center mb-5 text-slate-600">
          Just on a button click
        </h3>

        {/* <FeedList initialFeeds={initialFeeds} /> */}
      </div>
    </>
  );
}
