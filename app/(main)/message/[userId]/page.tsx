"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/back-button";
import ChatHeader from "../__components/chat-header";
import MessageBubble from "../__components/message-bubble";
import MessageInput from "../__components/message-input";

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

function ChatPage() {
  const params = useParams();
  const userId = params.userId as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock current user - replace with actual auth
  const currentUser = {
    id: "current-user",
    name: "You",
    username: "you",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    isOnline: true,
  };

  // Mock user data - replace with actual API call
  const chatUser: User = {
    id: userId,
    name: "Enzo Bustamante",
    username: "enzobustamante",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isOnline: true,
  };

  // Mock messages - replace with actual API call
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey man, I really love your work! Congratulations on everything, and thank you for always keeping up the great work.",
      senderId: currentUser.id,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: "text",
    },
    {
      id: "2",
      content: "Thank you so much! That means a lot to me 😊",
      senderId: userId,
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      type: "text",
    },
    {
      id: "3",
      content: "Keep up the amazing work! 🚀",
      senderId: currentUser.id,
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      type: "text",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUser.id,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a response (remove in production)
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! 👍",
        senderId: userId,
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <BackButton />
        <ChatHeader user={chatUser} />
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
            user={message.senderId === currentUser.id ? currentUser : chatUser}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <img
              src={chatUser.avatar}
              alt={chatUser.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onEmojiClick={handleEmojiClick}
          placeholder={`Message ${chatUser.name}...`}
        />
      </div>
    </div>
  );
}

export default ChatPage;
