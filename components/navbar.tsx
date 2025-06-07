"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { clsx } from "clsx";

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

import { Button } from "./ui/button";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "./ui/morphing-popover";
import { PostDialog } from "./post-component";
import { ModeToggle } from "./mode-toggle";
import ProfileOptions from "./profile-options";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
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

export default function Navbar() {
  const pathname = usePathname();
  const noNavPaths = ["/homepage", "/login", "/signup"];
  const showNav = !noNavPaths.includes(pathname);

  if (!showNav) return null;

  return (
    <div className="flex flex-col items-start justify-start mx-auto my-4 w-fit h-fit">
      <span className="mb-4 ml-3 flex gap-4">
        <ModeToggle />
        <ProfileOptions />
      </span>
      {navItems.map(({ label, href, icon: Icon }, index) => {
        const isActive = pathname === href;

        return (
          <Link
            key={index}
            href={href}
            className={clsx(
              "w-fit h-fit py-3 px-4 rounded-4xl transition-colors duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
              isActive && "relative"
            )}
          >
            <div className="flex items-center gap-5">
              <Icon
                className={`h-6 w-6 text-muted-foreground ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } `}
              />
              <span
                className={`text-[1rem] md:text-[1.25rem] font-semibold 
                ${
                  isActive
                    ? "text-primary border-dashed  border-b-2 border-primary"
                    : "text-muted-foreground border-b-2 border-transparent"
                }
`}
              >
                {label}
              </span>
            </div>
          </Link>
        );
      })}

      <MorphingPopover
        variants={{
          initial: { opacity: 0, filter: "blur(10px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          exit: { opacity: 0, filter: "blur(10px)" },
        }}
        transition={{ duration: 0.25, ease: "backOut" }}
      >
        <MorphingPopoverTrigger asChild>
          <Button className="flex cursor-pointer items-center mt-1 gap-5 w-fit h-fit py-3 px-4 rounded-4xl transition-colors duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-[1rem] md:text-[1.25rem] font-semibold text-muted-foreground bg-background">
            <motion.span
              layoutId="morphing-popover-custom-transition-variants-label"
              layout="position"
              className="flex items-center gap-5"
            >
              <EllipsisIcon className="h-6 w-6 text-foreground ml-2" />
              More Options
            </motion.span>
          </Button>
        </MorphingPopoverTrigger>

        <MorphingPopoverContent className="rounded-2xl shadow-2xl p-0 z-10 absolute bottom-0 ">
          <div className="flex flex-col gap-2">
            {popoverItems.map(({ label, href, icon: Icon }, index) => (
              <Link
                key={index}
                href={href}
                className="flex items-center gap-3 p-2 transition-colors duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
              >
                <Icon className="h-6 w-6 text-muted-foreground" />
                <span className="text-[1.25rem] font-semibold">{label}</span>
              </Link>
            ))}
          </div>
        </MorphingPopoverContent>
      </MorphingPopover>

      <PostDialog />
    </div>
  );
}
