import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Providerbutton from "@/components/providerButton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className=" flex flex-col justify-center h-screen gap-6 p-4 w-full max-w-md mx-auto shadow-lg ">
      <CardHeader className="  text-center ">
        <CardTitle className="text-4xl">MateLink</CardTitle>
        <CardDescription className="text-[0.94rem] text-muted-foreground">
          You need to log in to explore ideas, job offers, connect with your
          friends, and to buy or sell products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3 ">
          <Providerbutton />
          <div className="flex items-center gap-1.5 w-full">
            <hr className="w-full border-2  " />
            <p className="uppercase">or </p>
            <hr className="w-full border-2 " />
          </div>
        </div>
        <form className="flex flex-col my-4 gap-3">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <Button formAction={login}>Log In</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
