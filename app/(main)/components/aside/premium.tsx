import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function PremiumAD() {
  return (
    <div className="flex flex-col items-start text-start text-pretty  gap-4 p-6 bg-background border rounded-lg ">
      <h1 className="font-semibold text-2xl">Go Premium</h1>
      <p>
        Unlock everything you want—and so much more. Step into a world of
        features you never even imagined. Because ordinary just isn&apos;t your
        style.
      </p>
      <Button variant={"default"} asChild>
        <Link href="/premium">Unlock Premium</Link>
      </Button>
    </div>
  );
}

export default PremiumAD;
