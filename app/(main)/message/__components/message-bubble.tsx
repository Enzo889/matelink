"use client";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: "text" | "emoji";
}

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  user: User;
}

function MessageBubble({ message, isOwn, user }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: es,
      });
    }
  };

  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar - only show for other users */}
      {!isOwn && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      )}

      {/* Message Content */}
      <div
        className={`flex flex-col ${
          isOwn ? "items-end" : "items-start"
        } max-w-[70%]`}
      >
        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl break-words ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
