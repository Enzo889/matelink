"use client";

import {
  MoreHorizontal,
  Phone,
  Video,
  User,
  VolumeX,
  UserX,
  Flag,
  LogOut,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

interface ChatHeaderProps {
  user: User;
}

function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={user.avatar}
            alt={user.name}
            width={36}
            height={36}
            className="w-10 h-10 rounded-full object-cover"
          />
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">
            {user.isOnline ? "Active now" : `@${user.username}`}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer">
          <Phone className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer">
          <Video className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Options Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
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
  );
}

export default ChatHeader;
