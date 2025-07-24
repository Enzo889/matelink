import { PostFeed } from "@/components/post-component";
import Post from "./components/post";
import TopButtonComp from "./components/top-button";
import HeaderComp from "./components/header";
import { PetitionFeed } from "./petitions/__componets/petition-feed";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <HeaderComp />
        <span className="mt-3 max-md:hidden">
          <PostFeed offsetNumber={200} />
        </span>
        <span className="w-full max-w-3xl p-4 max-md:w-full">
          <PetitionFeed />
        </span>
        <span className="w-full max-w-3xl max-md:w-full">
          <Post />
        </span>
        <TopButtonComp />
      </div>
    </>
  );
}
