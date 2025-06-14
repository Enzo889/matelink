"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function TopButtonComp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 left-[26.5%] max-md:left-4 rounded-full px-6 py-3 shadow-lg cursor-pointer"
      variant={"secondary"}
    >
      <ArrowUpIcon className="w-5 h-5" />
    </Button>
  );
}

export default TopButtonComp;
