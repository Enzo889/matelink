import {
  MessageCircleMore,
  MoreHorizontal,
  User,
  VolumeX,
  UserX,
  Flag,
  LogOut,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function MessageList() {
  const userList = [
    {
      username: "enzobustamante",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Enzo Bustamante",
      time: 5,
    },
    {
      username: "mariasanchez",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "María Sánchez",
      time: 996516,
    },
    {
      username: "carlosgomez",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Carlos Gómez",
      time: 50,
    },
    {
      username: "lauramartinez",
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Laura Martínez",
      time: 0.5,
    },
    {
      username: "alejandrolopez",
      profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Alejandro López",
      time: 155555,
    },
  ];

  if (!userList) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-6 gap-2">
        <MessageCircleMore className="size-16 text-primary" />
        <p className="font-bold text-2xl">Nothing here</p>
        <p className="font-extralight text-foreground/70">
          You have no conversations yet. Start one!
        </p>
      </div>
    );
  }

  const formatTime = (time: number) => {
    if (time < 1) {
      return "now";
    } else if (time < 60) {
      return `${time}m`;
    } else if (time < 1440) {
      const hours = Math.floor(time / 60);
      return `${hours}h`;
    } else if (time < 10080) {
      const days = Math.floor(time / 1440);
      return `${days}d`;
    } else if (time < 43200) {
      const weeks = Math.floor(time / 10080);
      return `${weeks}w`;
    } else if (time < 525600) {
      const months = Math.floor(time / 43200);
      return `${months}mo`;
    } else {
      const years = Math.floor(time / 525600);
      return `${years}y`;
    }
  };

  return (
    <div className="flex flex-col">
      {userList.map((item, index) => (
        <div
          key={index}
          className="relative flex items-start gap-3 p-4 hover:bg-muted/50 border-b border-border/50 group"
        >
          {/* Clickable Link Overlay */}
          <Link
            href={`/message/${item.username}`}
            className="absolute inset-0 z-0"
          />

          {/* Avatar */}
          <div className="flex-shrink-0 relative z-10">
            <Image
              src={item.profilePicture}
              alt={item.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 relative z-10 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground">
                {formatTime(item.time)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              @{item.username}
            </div>
            <div className="text-sm text-foreground">
              You: Hey man, I really love your work! Congratulations on
              everything, and thank you for always keeping up the great work.
            </div>
          </div>

          {/* Options */}
          <div className="flex-shrink-0 relative z-20">
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-1 hover:bg-muted rounded cursor-pointer pointer-events-auto">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end">
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-card-foreground/10 transition-colors cursor-pointer">
                    <User className="w-4 h-4" />
                    Go to profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-card-foreground/10 transition-colors cursor-pointer">
                    <VolumeX className="w-4 h-4" />
                    Mute conversation
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-card-foreground/10 transition-colors cursor-pointer">
                    <UserX className="w-4 h-4" />
                    Block account
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-card-foreground/10 transition-colors cursor-pointer">
                    <Flag className="w-4 h-4" />
                    Report conversation
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-card-foreground/10 transition-colors text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Leave conversation
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
