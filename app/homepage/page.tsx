import LoginForHomepage from "@/components/login-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            Welcome to MateLink
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4 w-full border-2">
          <Image
            alt="logo"
            src="108-logo-light.svg"
            width={600}
            height={600}
            className=""
          />
          <LoginForHomepage />
        </CardContent>
      </Card>
    </main>
  );
}
