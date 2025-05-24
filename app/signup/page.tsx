import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Providerbutton from "@/components/providerButton";
import Link from "next/link";
import { signup } from "./actions";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div className="flex flex-col items-center gap-3 border p-4 rounded-md">
        <p>Sign-up with Google</p>
        <Providerbutton />
        <p>or</p>
      </div>
      <form className="flex flex-col gap-3">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />
        <Button formAction={signup}>Sign up</Button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </div>
  );
}