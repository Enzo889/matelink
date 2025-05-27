import { Label } from "@/components/ui/label";
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
    <Card className=" flex flex-col justify-center h-screen gap-3 w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="  text-center ">
        <CardTitle>MateLink</CardTitle>
        <CardDescription>
          You need to sign up to explore ideas, job offers, connect with your
          friends, and to buy or sell products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3 border p-4 rounded-md">
          <Providerbutton signIn={false} />
          <p>or</p>
        </div>
        <form className="flex flex-col gap-3">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required />
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
