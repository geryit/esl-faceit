"use client";
import {useEffect, useState} from "react";
import { FEED_PER_PAGE } from "@/config/constants";
import { getFeeds } from "@/actions/getFeeds";
import FeedCard from "./FeedCard";
import {Feed} from "@/types/Feed";
import {useInView} from "react-intersection-observer";

type Props = {
  initialFeeds: Feed[];
};

export default function FeedList({ initialFeeds }: Props) {
  const [offset, setOffset] = useState(FEED_PER_PAGE);
  const [feeds, setFeeds] = useState<Feed[]>(initialFeeds);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [scrollTrigger, isInView] = useInView();

  console.log({isInView})

  const loadMoreFeeds = async () => {
    if (hasMoreData) {
      const apiFeeds = await getFeeds(offset, FEED_PER_PAGE);

      if (!apiFeeds.length) {
        setHasMoreData(false);
      }

      setFeeds((prevFeeds) => [...prevFeeds, ...apiFeeds]);
      setOffset((prevOffset) => prevOffset + FEED_PER_PAGE);
    }
  };
  useEffect(() => {
    if (isInView && hasMoreData) {
      loadMoreFeeds();
    }
  }, [isInView, hasMoreData]);





  return (
    <>
      <div className="flex flex-col gap-2">
        {feeds?.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData && (
          <div ref={scrollTrigger}>Loading...</div>
        )}
      </div>
    </>
  );
}
