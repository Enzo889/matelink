import { Button } from "@/components/ui/button";
import { UsersProfile } from "@/components/usersProfle";


export default function Home() {
 
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <UsersProfile />
        <Button>Hello</Button>
      </div>
    </>
  );
}
