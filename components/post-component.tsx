"use client";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "./ui/prompt-input";
import { ArrowUp, Paperclip, Square, X, PlusCircle } from "lucide-react";
import EmojiInput from "./emoji-input";
import PostOptions from "./post-options";
import NumberFlow from "@number-flow/react";
import { AvatarComponent } from "@/app/(main)/components/avatar";
import { CreatePetitionModal } from "@/app/(main)/petitions/__componets/create-petition-modal";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./ui/dialog";

export const PostDialog = () => {
  const [showPostFeed, setShowPostFeed] = useState(false);
  const [showPetitionModal, setShowPetitionModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer text-xl md:text-2xl font-semibold rounded-4xl mt-1.5 py-3 px-16 flex items-center gap-4"
            onClick={() => setPopoverOpen(true)}
          >
            <PlusCircle className="size-6" />
            New Post
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 flex flex-col gap-4">
          <Button
            variant="default"
            className="w-full cursor-pointer"
            onClick={() => {
              setShowPostFeed(true);
              setPopoverOpen(false);
            }}
          >
            Create Post
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => {
              setShowPetitionModal(true);
              setPopoverOpen(false);
            }}
          >
            Create Petition
          </Button>
        </PopoverContent>
      </Popover>

      {showPostFeed && (
        <Dialog open={showPostFeed} onOpenChange={setShowPostFeed}>
          <DialogContent className="min-w-xl rounded-4xl p-0">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogClose className="hidden opacity-0"></DialogClose>
            <PostFeed />
          </DialogContent>
        </Dialog>
      )}

      <CreatePetitionModal
        open={showPetitionModal}
        onOpenChange={setShowPetitionModal}
      />
    </>
  );
};

export const PostFeed = ({ offsetNumber = 8 }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInput("");
        setFiles([]);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = "";
    }
  };

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-xl   h-full min-h-fit  max-md:w-xs"
    >
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Paperclip className="size-4" />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="hover:bg-secondary/50 rounded-full p-1"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className=" flex ">
        <span className="resize-none border-none  focus-visible:ring-offset-0 border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content rounded-md border bg-transparent px-3 pt-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          <AvatarComponent className="w-8 h-8" containerClassName="relative" />
        </span>
        <PromptInputTextarea
          placeholder="Got something to share?"
          minLength={1}
        />
      </div>

      <PromptInputActions className="flex-col items-start gap-2">
        <div className=" resize-none border-none  focus-visible:ring-offset-0 border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  field-sizing-content  w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex ">
          <PromptInputAction tooltip="post visibility" side="left">
            <PostOptions offsetNumber={offsetNumber} />
          </PromptInputAction>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PromptInputAction tooltip="Attach files">
              <label
                htmlFor="file-upload"
                className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Paperclip className="text-primary size-5" />
              </label>
            </PromptInputAction>

            <PromptInputAction tooltip="Emojis">
              <span>
                <EmojiInput
                  onEmojiClick={(emoji) => setInput((prev) => prev + emoji)}
                />
              </span>
            </PromptInputAction>
          </div>

          <div className="flex items-center gap-2">
            <PromptInputAction tooltip="Character count">
              <span
                className={`text-xs text-foreground p-2 rounded-4xl  ${
                  input.length > 300 ? "bg-destructive" : "bg-secondary"
                } `}
              >
                <NumberFlow value={300 - input.length} />
              </span>
            </PromptInputAction>
            <PromptInputAction
              tooltip={isLoading ? "Stop publication" : "Send post"}
            >
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <Square className="size-5 fill-current" />
                ) : (
                  <ArrowUp className="size-5" />
                )}
              </Button>
            </PromptInputAction>
          </div>
        </div>
      </PromptInputActions>
    </PromptInput>
  );
};
