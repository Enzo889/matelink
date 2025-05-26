import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Matelink
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-center">
            Connect, share, and grow your social network.
          </p>
          <Link
            href="/login"
            className={buttonVariants({
              className: "w-full",
              variant: "default",
              size: "lg",
            })}
          >
            Get Started
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
