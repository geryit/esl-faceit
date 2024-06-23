import PostList from "@/components/PostList";

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">Posts</h1>

        <PostList />
      </div>
    </>
  );
}
