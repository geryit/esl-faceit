"use client";
import { useState } from "react";
import { Post } from "@/types/Post";
import { POSTS_PER_PAGE } from "@/config/constants";
import { getPosts } from "@/actions/getPosts";
import FeedCard from "./FeedCard";

type Props = {
  initialPosts: Post[];
};

export default function FeedList({ initialPosts }: Props) {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = await getPosts(offset, POSTS_PER_PAGE);

      if (!apiPosts.length) {
        setHasMoreData(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {posts?.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData ? (
          <button
            className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
            onClick={loadMorePosts}
          >
            Load More Posts
          </button>
        ) : (
          <p className="text-slate-600">No more posts to load</p>
        )}
      </div>
    </>
  );
}
