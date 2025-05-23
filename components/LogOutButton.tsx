"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const supabase = createClient();
  const route = useRouter();
  const clickHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      route.push("/");
    }
  };
  return <Button onClick={clickHandler}> Log out</Button>;
}
