import LogoutButton from "@/components/LogOutButton";
import { Button } from "@/components/ui/button";
import UsersProfile from "@/components/usersProfle";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <UsersProfile />
        <Button>Hello</Button>
        <LogoutButton />
      </div>
    </>
  );
}
