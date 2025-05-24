"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('Signup error:', error);
    redirect("/error?message=Could not authenticate user&description=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  // Redirect to a page informing the user to check their email for confirmation
  redirect("/auth/confirm");
}