import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function WhatHappenig() {
  return (
    <div className="flex flex-col items-start gap-4  p-6 bg-background border rounded-lg text-start text-pretty">
      <p className="font-semibold text-2xl">What is Happening</p>
      {whatHappenigComponents()}
      <Button variant={"link"} asChild className="p-0">
        <Link href={"#"}>Show more </Link>
      </Button>
    </div>
  );
}

export default WhatHappenig;

const whatHappenigComponents = () => {
  interface TrendData {
    location: string;
    topic: string;
    posts: string;
  }
  const data: TrendData[] = [
    {
      location: "Argentina",
      topic: "Messi",
      posts: "424.550 posts",
    },
    { location: "USA", topic: "NBA Finals", posts: "515.200 posts" },
    { location: "Argentina", topic: "World Cup", posts: "750.505 posts" },
  ];
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <p className="text-xs text-foreground/50">Trend in {item.location}</p>
          <p>{item.topic}</p>
          <p className="text-xs text-foreground/50">{item.posts}</p>
        </div>
      ))}
    </>
  );
};
