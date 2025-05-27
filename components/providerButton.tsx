"use client";

import { Provider } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Google } from "./Icons";
import { createClient } from "@/utils/supabase/client";

type ProviderButtonProps = {
  signIn?: boolean; // este prop es opcional, default a true
};

export default function Providerbutton({ signIn = true }: ProviderButtonProps) {
  const supabase = createClient();

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
    <div className="flex items-center justify-center gap-1.5">
      <p>{signIn ? "Log in" : "Sign in"} with</p>
      <Button variant="outline" onClick={() => signInWithProvider("google")}>
        <Google className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}
