import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Providerbutton from "@/components/providerButton";
import Link from "next/link";
import { signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className=" flex flex-col justify-center h-screen gap-6 p-4 w-full max-w-md mx-auto shadow-lg ">
      <CardHeader className="  text-center ">
        <CardTitle className="text-4xl">MateLink</CardTitle>
        <CardDescription className="text-[0.94rem] text-muted-foreground">
          You need to sign up to explore ideas, job offers, connect with your
          friends, and to buy or sell products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3 ">
          <Providerbutton signIn={false} />
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
          <p className="text-xs text-muted-foreground">
            Password must be at least 6 characters long. And to complete your
            registration, you must verify your email address.
          </p>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">
              Terms
            </Link>
            ,{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Cookies Policy
            </Link>
            .
          </p>
          <Button formAction={signup}>Sign up</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
