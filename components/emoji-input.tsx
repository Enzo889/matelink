"use client";

import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { createPortal } from "react-dom";
import { Smile } from "lucide-react";

export default function EmojiInput({
  onEmojiClick,
}: {
  onEmojiClick: (emoji: string) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cierra picker si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setShowPicker((prev) => !prev)}
        className="hover:bg-secondary-foreground/10 flex h-8 w-8 items-center justify-center rounded-2xl cursor-pointer"
        type="button"
      >
        <Smile className="text-primary size-5" />
      </button>

      {showPicker &&
        createPortal(
          <div
            ref={pickerRef}
            className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <EmojiPicker
              theme={Theme.AUTO}
              emojiStyle={EmojiStyle.APPLE}
              onEmojiClick={(emojiData) => {
                onEmojiClick(emojiData.emoji);
                setShowPicker(false);
              }}
              autoFocusSearch={false}
            />
          </div>,
          document.body
        )}
    </>
  );
}
