import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function UsersProfile() {
  const supabase = await createClient();
  // const session = supabase.from("users").select("*")

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p> <p> --- </p>{" "}
      <p> {data.user.id || "no phone"}</p>
    </>
  );
}
