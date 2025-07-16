"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmojiInput from "@/components/emoji-input";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onEmojiClick: (emoji: string) => void;
  placeholder?: string;
}

function MessageInput({
  value,
  onChange,
  onSend,
  onEmojiClick,
  placeholder = "Write a message...",
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div
        className={`flex items-end gap-3 p-3 rounded-2xl border transition-colors ${
          isFocused
            ? "border-primary/50 bg-background"
            : "border-border bg-muted/30"
        }`}
      >
        {/* Attachment Button */}
        <button
          type="button"
          className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
        >
          <Paperclip className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Image Button */}
        <button
          type="button"
          className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
        >
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Text Input */}
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full resize-none border-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 min-h-[24px] max-h-[120px]"
            rows={1}
          />
        </div>

        {/* Emoji Picker */}
        <div className="flex-shrink-0">
          <EmojiInput onEmojiClick={onEmojiClick} />
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          size="sm"
          disabled={!value.trim()}
          className="flex-shrink-0 rounded-full w-8 h-8 p-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground mt-2 px-3">
        Press Enter to send, Shift + Enter for new line
      </p>
    </form>
  );
}

export default MessageInput;
