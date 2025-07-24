"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/back-button";
import ChatHeader from "../__components/chat-header";
import MessageInput from "../__components/message-input";
import { useRealtimeChat } from "@/hooks/use-realtime-chat";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatMessageItem } from "../__components/chat-message";
import { createClient } from "@/utils/supabase/client";
import { UserType } from "@/types/tables.type";

function normalizeUsername(username: string) {
  return username.trim().toLowerCase().replace(/\s+/g, "-");
}

function ChatPage() {
  const params = useParams();
  // Normaliza el username del destinatario desde la URL
  const userId = normalizeUsername(params.userId as string);

  const [userProfile, setUserProfile] = useState<UserType | null>(null); // usuario autenticado
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);

      // 1. Perfil usuario autenticado
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData?.user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }
      const { data: profileData } = await supabase
        .from("users")
        .select(
          "id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid"
        )
        .eq("uuid", authData.user.id)
        .single<UserType>();

      // Normaliza el username del usuario autenticado
      if (profileData) {
        profileData.username = normalizeUsername(profileData.username);
      }
      setUserProfile(profileData || null);

      // 2. Perfil usuario destinatario (por username normalizado)
      const { data: chatUserData } = await supabase
        .from("users")
        .select(
          "id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid"
        )
        .eq("username", userId)
        .single<UserType>();

      if (chatUserData) {
        chatUserData.username = normalizeUsername(chatUserData.username);
      }

      setLoading(false);
    };

    fetchProfiles();
  }, [supabase, userId]);

  // Room name genérico para todos los usuarios
  const roomName = "chat";

  const { messages, sendMessage } = useRealtimeChat(
    userProfile
      ? {
          roomName,
          username: userProfile.username,
        }
      : {
          roomName: "",
          username: "",
        }
  );

  const { containerRef, scrollToBottom } = useChatScroll();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        User not found or not authenticated.
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <BackButton />
        <ChatHeader
          user={{
            id: userProfile.id.toString(),
            name: userProfile.name || "Unknown User",
            username: userProfile.username,
            avatar: userProfile.profile_picture || "/default-avatar.png",
            isOnline: false,
          }}
        />
      </div>

      {/* Messages Container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            isOwnMessage={message.user.name === userProfile.username}
            showHeader={
              idx === 0 || messages[idx - 1].user.name !== message.user.name
            }
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onEmojiClick={(emoji) => setNewMessage((prev) => prev + emoji)}
          placeholder={`Message ${userProfile.name}...`}
        />
      </div>
    </div>
  );
}

export default ChatPage;
