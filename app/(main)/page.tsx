import { PostFeed } from "@/components/post-component";
import Post from "./components/post";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <span className="mt-3">
          <PostFeed offsetNumber={200} />
        </span>
        <span className="w-full max-w-3xl">
          <Post />
        </span>
      </div>
    </>
  );
}
