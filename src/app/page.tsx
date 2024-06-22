import PostList from "@/components/PostList";

export default function Home() {
  // const initialFeeds = await getFeeds(0, FEED_PER_PAGE);

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

        <PostList />
      </div>
    </>
  );
}
