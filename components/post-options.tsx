import { useState } from "react";
import { Check, GlobeIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "./ui/morphing-popover";
import { Toggle } from "./ui/toggle";
import { Switch } from "./ui/switch";

function PostOptions() {
  const [replies, setReplies] = useState("everybody");
  const [mentioned, setMentioned] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <MorphingPopoverTrigger asChild>
        <p
          onClick={() => setIsOpen(true)}
          className="text-primary text-xs bg-muted-foreground/10 px-2 py-1 rounded-full hover:bg-secondary-foreground/20 cursor-pointer flex items-center gap-1"
        >
          <GlobeIcon className="inline size-3" />
          Anybody can interact
        </p>
      </MorphingPopoverTrigger>
      <MorphingPopoverContent className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md  rounded-lg shadow-lg ">
        <Card className="w-full  max-h-3/4">
          <CardHeader>
            <CardTitle>Post interaction settings</CardTitle>
            <CardDescription>
              Customize who can interact with this post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="py-2 border-y-2 border-muted-foreground/20">
                <p className="font-semibold">Quote settings</p>
                <span className="flex items-center justify-between">
                  <p>Allow quote posts</p>
                  <Switch className="cursor-pointer" aria-readonly />
                </span>
              </div>
              <div className="pt-4">
                <p className="font-semibold">Reply settings</p>
                <p>Allow replies from:</p>
                <span className="flex items-center justify-center gap-2">
                  <Toggle
                    className="cursor-pointer w-full justify-between"
                    variant="outline"
                    pressed={replies === "everybody"}
                    onPressedChange={() => setReplies("everybody")}
                  >
                    Everybody
                    {replies === "everybody" && (
                      <Check className="inline size-3" />
                    )}
                  </Toggle>
                  <Toggle
                    className="cursor-pointer w-full justify-between"
                    variant="outline"
                    pressed={replies === "nobody"}
                    onPressedChange={() => setReplies("nobody")}
                  >
                    Nobody
                    {replies === "nobody" && (
                      <Check className="inline size-3" />
                    )}
                  </Toggle>
                </span>
              </div>
              {replies === "everybody" && (
                <div className="flex flex-col gap-1 py-4">
                  <p>or combine these options:</p>
                  <Toggle
                    className="cursor-pointer w-full justify-between"
                    variant="outline"
                    pressed={mentioned}
                    onPressedChange={(val) => setMentioned(val)}
                  >
                    Mentioned users
                    {mentioned && <Check className="inline size-3" />}
                  </Toggle>
                  <Toggle
                    className="cursor-pointer w-full justify-between"
                    variant="outline"
                    pressed={followed}
                    onPressedChange={(val) => setFollowed(val)}
                  >
                    Users you follow
                    {followed && <Check className="inline size-3" />}
                  </Toggle>
                  <Toggle
                    className="cursor-pointer w-full justify-between"
                    variant="outline"
                    pressed={followers}
                    onPressedChange={(val) => setFollowers(val)}
                    // onClick={(e) => e.stopPropagation()}
                    // onClickCapture={(e) => e.stopPropagation()}
                  >
                    Your followers
                    {followers && <Check className="inline size-3" />}
                  </Toggle>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center w-full">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full cursor-pointer"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}

export default PostOptions;
