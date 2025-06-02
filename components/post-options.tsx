import { useState } from "react";
import { Check, GlobeIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "./ui/toggle";
import { Switch } from "./ui/switch";

export default function PostOptions() {
  const [replies, setReplies] = useState<"everybody" | "nobody">("everybody");
  const [mentioned, setMentioned] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <p className="text-primary text-xs bg-muted-foreground/10 px-2 py-1 rounded-full hover:bg-secondary-foreground/20 cursor-pointer flex items-center gap-1">
          <GlobeIcon className="inline size-3" />
          Anybody can interact
        </p>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen z-50 fixed top-1/2 left-1/2  -translate-y-1/2 max-w-sm rounded-xl border bg-popover shadow-xl md:max-w-md   max-h-[90vh] overflow-y-auto"
        sideOffset={8}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Card className="overflow-hidden rounded-xl shadow-none border-0">
          <CardHeader className="bg-muted/30 ">
            <CardTitle className="text-lg font-semibold">
              Post Interaction Settings
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Customize who can interact with this post.
            </CardDescription>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 p-1 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <p className="font-medium text-card-foreground">
                  Quote Settings
                </p>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="allow-quote-posts"
                    className="text-sm text-muted-foreground"
                  >
                    Allow quote posts
                  </label>
                  <Switch
                    id="allow-quote-posts"
                    className="cursor-pointer"
                    aria-readonly
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <p className="font-medium text-card-foreground">
                  Reply Settings
                </p>
                <p className="text-sm text-muted-foreground">
                  Allow replies from:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Toggle
                    className="w-full justify-between rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground  cursor-pointer"
                    variant="outline"
                    pressed={replies === "everybody"}
                    onPressedChange={() => setReplies("everybody")}
                  >
                    <span>Everybody</span>
                    {replies === "everybody" && <Check className="size-4" />}
                  </Toggle>
                  <Toggle
                    className="w-full justify-between rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground  cursor-pointer"
                    variant="outline"
                    pressed={replies === "nobody"}
                    onPressedChange={() => setReplies("nobody")}
                  >
                    <span>Nobody</span>
                    {replies === "nobody" && <Check className="size-4" />}
                  </Toggle>
                </div>
              </div>

              {replies === "everybody" && (
                <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Or, refine who can reply:
                  </p>
                  <div className="space-y-2">
                    <Toggle
                      className="w-full justify-between rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground  cursor-pointer"
                      variant="outline"
                      pressed={mentioned}
                      onPressedChange={(val) => setMentioned(val)}
                    >
                      <span>Mentioned users</span>
                      {mentioned && <Check className="size-4" />}
                    </Toggle>
                    <Toggle
                      className="w-full justify-between rounded-md border border-input bg-transparent px-4 py-2  cursor-pointer text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                      variant="outline"
                      pressed={followed}
                      onPressedChange={(val) => setFollowed(val)}
                    >
                      <span>Users you follow</span>
                      {followed && <Check className="size-4" />}
                    </Toggle>
                    <Toggle
                      className="w-full justify-between rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground  cursor-pointer"
                      variant="outline"
                      pressed={followers}
                      onPressedChange={(val) => setFollowers(val)}
                    >
                      <span>Your followers</span>
                      {followers && <Check className="size-4" />}
                    </Toggle>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-border bg-muted/30 p-2 md:p-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
