import Link from "next/link";
import Providerbutton from "./providerButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login } from "@/app/login/actions";

export default function LoginForHomepage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3 ">
      <form className="flex flex-col gap-3 w-sm">
        <Label htmlFor="email"></Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <Label htmlFor="password"></Label>
        <Input
          id="password"
          name="password"
          type="password"
          min={6}
          required
          placeholder="Password"
        />
        <Button formAction={login}>Log in</Button>
      </form>
      <div className="flex flex-col items-center gap-3 w-sm">
        <div className="flex items-center gap-1.5 w-full">
          <hr className="w-full border-2  " />
          <p className="uppercase">or </p>
          <hr className="w-full border-2 " />
        </div>

        <Providerbutton signIn={true} />
      </div>
      <div className="flex flex-col items-center p-6 gap-6 w-sm">
        <Link href="/forgot-password" className="text-sm underline">
          Forgot your password?
        </Link>

        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
