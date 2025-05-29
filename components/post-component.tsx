"use client";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "./ui/morphing-dialog";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "./ui/prompt-input";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";

export const PostDialog = () => {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <div
          className={` bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" cursor-pointer text-xl md:text-2xl font-semibold rounded-4xl mt-1.5 py-3  px-24`}
        >
          Post
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent>
          <div>
            <PostFeed />
          </div>
          <MorphingDialogClose>Close</MorphingDialogClose>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export const PostFeed = () => {
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
      className="w-full min-w-xl h-full min-h-fit overflow-y-auto"
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

      <PromptInputTextarea placeholder="Got something to share?" />

      <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
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
      </PromptInputActions>
    </PromptInput>
  );
};
