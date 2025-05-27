"use client";

import {
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  CompassIcon,
  CrownIcon,
  EllipsisIcon,
  HomeIcon,
  MailIcon,
  MegaphoneIcon,
  SettingsIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function Navbar() {
  const pathname = usePathname();
  const items = [
    { label: "Home", href: "/homepage", icon: HomeIcon },
    { label: "Explore", href: "/explore", icon: CompassIcon },
    { label: "Notifications", href: "/notifications", icon: BellIcon },
    { label: "Messages", href: "/messages", icon: MailIcon },
    { label: "Profile", href: "/profile", icon: UserIcon },
    { label: "Job Offers", href: "/job-offers", icon: BriefcaseIcon },
    { label: "Marketplace", href: "/marketplace", icon: ShoppingCartIcon },
  ];

  const popoverItems = [
    { label: "Premium", href: "/premium", icon: CrownIcon },
    { label: "Saved", href: "/saved", icon: BookmarkIcon },
    { label: "Organizations", href: "/organizations", icon: Building2Icon },
    { label: "Ads", href: "/ads", icon: MegaphoneIcon },
    { label: "Settings", href: "/settings", icon: SettingsIcon },
    { label: "Privacy", href: "/privacy", icon: ShieldIcon },
  ];
  return (
    <div className="flex flex-col items-start justify-start ml-4 my-4">
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            className={` w-fit h-fit py-3 px-4  hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer transition-colors duration-200 ease-in-out rounded-4xl`}
            key={index}
            href={item.href}
          >
            <span className=" flex items-center gap-5">
              <span className="flex items-center justify-center">
                <Icon
                  className={` h-6 w-6 
                    text-muted-foreground transition-colors  `}
                />
              </span>
              <span
                className={`text-[1rem] md:text-[1.25rem] font-semibold text-muted-foreground ${
                  isActive ? (
                    <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-3.5 text-blue-950/80" />
                  ) : (
                    "text-muted-foreground"
                  )
                } `}
              >
                {item.label}
              </span>
            </span>
          </Link>
        );
      })}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex bg-background text-muted-foreground font-semibold items-center justify-center gap-5  w-fit h-fit p-4  hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer transition-colors duration-200 ease-in-out rounded-4xl text-[1rem] md:text-[1.25rem]  ">
            <EllipsisIcon className="h-6 w-6 text-foreground transition-colors ml-2 " />{" "}
            More Options
          </Button>
        </PopoverTrigger>
        <PopoverContent className="rounded-2xl shadow-2xl p-0 overflow-hidden">
          <div className="flex flex-col gap-2 ">
            {popoverItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 p-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50  transition-colors duration-200 ease-in-out "
                >
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <span className="text-[1.25rem] font-semibold">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <Button className="cursor-pointer text-xl md:text-2xl font-semibold rounded-4xl mt-1.5 py-6 px-28">
        Post
      </Button>
    </div>
  );
}

export default Navbar;
