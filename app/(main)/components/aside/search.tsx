import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

function AsideSearchComponent() {
  return (
    <div className="relative">
      <Input
        placeholder="Search"
        className="pl-10 peer placeholder-transparent"
      />
      <span
        className="
      absolute left-3 top-1/2 -translate-y-1/2
      text-muted-foreground transition-colors duration-200 ease-in-out
      peer-focus:text-primary
      peer-placeholder-shown:text-muted-foreground
      peer-hover:text-muted-foreground/80
    "
      >
        <SearchIcon className="size-5.5" />
      </span>
    </div>
  );
}

export default AsideSearchComponent;
