import BackButton from "@/components/back-button";
import ProfileOptions from "@/components/profile-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function JobSearch() {
  return (
    <section className="py-16">
      <div className="mx-auto container">
        <div className="mx-auto flex flex-col max-w-5xl  items-center gap-6 text-center">
          <Image
            alt="MateLink Logo"
            src="108-logo-light.svg"
            width={100}
            height={100}
          />
          <h2 className="text-4xl font-bold text-pretty lg:text-6xl">
            Search Jobs
          </h2>{" "}
          <span className="absolute left-4 top-4 z-10">
            <BackButton />
          </span>
          <span className="absolute right-4 top-4 z-10">
            <ProfileOptions />
          </span>
          <p className="text-muted-foreground lg:text-xl">Find your next job</p>
          <div className="flex w-full max-w-2xl flex-col items-stretch gap-4 md:flex-row">
            <Input placeholder="Keyword" />
            <Input placeholder="Location" />
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
