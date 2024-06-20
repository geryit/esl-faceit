import { getFeeds } from "@/actions/getFeeds";
import { FEED_PER_PAGE } from "@/config/constants";
import FeedList from "@/components/FeedList";

export default async function Home() {
  const initialFeeds = await getFeeds(0, FEED_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">
          Loading feeds asynchronously
        </h1>

        <h3 className="text-center mb-5 text-slate-600">
          Just on a button click
        </h3>

        <FeedList initialFeeds={initialFeeds} />
      </div>
    </>
  );
}
