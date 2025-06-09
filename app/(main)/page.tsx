import { PostFeed } from "@/components/post-component";
import PostCard from "./components/post-card";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <span className="mt-3">
          <PostFeed offsetNumber={200} />
        </span>
        <PostCard />
      </div>
    </>
  );
}
