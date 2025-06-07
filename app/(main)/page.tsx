import { PostFeed } from "@/components/post-component";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <span className="mt-3">

        <PostFeed offsetNumber={200} />
        </span>
      </div>
    </>
  );
}
