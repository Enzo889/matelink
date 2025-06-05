"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      onClick={() => router.back()}
      className="mb-4 rounded-full cursor-pointer active:cursor-progress text-secondary-foreground"
    >
      <ArrowLeftIcon className="size-5.5" />
    </Button>
  );
}

export default BackButton;
