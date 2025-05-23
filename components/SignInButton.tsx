"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Google } from "./Icons";

const SUPABASE_REDIRECT = "http://localhost:3000/auth/callback";
export default function SignInButton() {
  const supabase = createClientComponentClient();

  const signInWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error("Error signing in with provider:", error);
    } else {
      console.log("Sign in successful:", data);
    }
  };

  return (
    <div className="grid gap-6">
      <Button variant="outline" onClick={() => signInWithProvider("google")}>
        <Google className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}
