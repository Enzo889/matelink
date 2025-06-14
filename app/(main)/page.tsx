import { PostFeed } from "@/components/post-component";
import Post from "./components/post";
import TopButtonComp from "./components/top-button";
import ButtonPost from "./components/button-post";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <span className="mt-3 max-md:hidden">
          <PostFeed offsetNumber={200} />
        </span>
        <span className="w-full max-w-3xl max-md:w-full">
          <Post />
        </span>
        <TopButtonComp />
        <ButtonPost />
      </div>
    </>
  );
}
