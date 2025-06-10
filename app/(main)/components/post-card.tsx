"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import LinkNext from "next/link";
import { AvatarComponent } from "./avatar";
import {
  Bookmark,
  Flag,
  Heart,
  Link,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
  Trash2,
  UserPlus,
  UserX,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { PostCardProps } from "@/types/post";

export function PostCard({
  post,
  currentUserId,
  actions = {},
  showMenu = true,
  showStats = true,
  className,
  compact = false,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [isReposted, setIsReposted] = useState(post.user_has_reposted || false);
  const [repostCount, setRepostCount] = useState(post.repost_count || 0);
  const [isSaved, setIsSaved] = useState(post.user_has_saved || false);
  const [commentCount, setCommentCount] = useState(post.comments_count || 0);

  const isOwnPost = currentUserId === post.user_id;
  const isVerified = post.author.is_company || false; // You can add verification logic

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await actions.onLike?.(post.id, newLikedState);
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
      setLikeCount((prev) => (newLikedState ? prev - 1 : prev + 1));
      toast.error("Error updating like");
      console.error("Error updating like:", error);
    }
  };

  const handleRepost = async () => {
    const newRepostState = !isReposted;
    setIsReposted(newRepostState);
    setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1));

    try {
      await actions.onRepost?.(post.id, newRepostState);
    } catch (error) {
      // Revert on error
      setIsReposted(!newRepostState);
      setRepostCount((prev) => (newRepostState ? prev - 1 : prev + 1));
      toast.error("Error updating repost");
      console.error("Error updating repost:", error);
    }
  };

  const handleSave = async () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    try {
      await actions.onSave?.(post.id, newSavedState);
      toast.success(newSavedState ? "Post saved" : "Post unsaved");
    } catch (error) {
      // Revert on error
      setIsSaved(!newSavedState);
      toast.error("Error updating saved status");
      console.error("Error updating saved status:", error);
    }
  };

  const handleComment = () => {
    actions.onComment?.(post.id);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
    actions.onShare?.(post.id, url);
  };

  const handleMenuAction = async (action: string) => {
    try {
      switch (action) {
        case "follow":
          await actions.onFollow?.(post.author.id);
          toast.success(`Following @${post.author.username}`);
          break;
        case "copy-link":
          handleShare();
          break;
        case "mute":
          await actions.onMute?.(post.author.id);
          toast.success(`Muted @${post.author.username}`);
          break;
        case "block":
          await actions.onBlock?.(post.author.id);
          toast.success(`Blocked @${post.author.username}`);
          break;
        case "report":
          await actions.onReport?.(post.id);
          toast.success("Post reported");
          break;
        case "delete":
          await actions.onDelete?.(post.id);
          toast.success("Post deleted");
          break;
        case "send-direct-message":
          console.log("Send direct message");
          break;
        default:
          console.log(`Action: ${action}`);
      }
    } catch (error) {
      toast.error("Action failed");
      console.error(`Error performing action "${action}":`, error);
    }
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return date.toLocaleDateString();
  };

  const getFullName = (user: typeof post.author) => {
    return `${user.name} ${user.surname}`.trim();
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full mx-auto",
        compact ? "p-2" : "p-4",
        className
      )}
    >
      <Card className="border-accent bg-background shadow-sm hover:shadow-md duration-200 cursor-pointer hover:bg-card/30 transition-all">
        <CardHeader
          className={cn(
            "flex flex-row items-start gap-3 space-y-0 pb-0",
            compact && "p-3"
          )}
        >
          <AvatarComponent
            className={compact ? "h-6 w-6" : "h-8 w-8"}
            containerClassName="relative"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <LinkNext
                  href={`/user/${post.author.username}`}
                  className="font-semibold text-sm text-primary hover:underline cursor-pointer"
                  id="author-name"
                >
                  {getFullName(post.author)}
                </LinkNext>
                {isVerified && (
                  <Badge
                    variant="outline"
                    className="rounded-full bg-blue-50 text-blue-600 hover:bg-blue-50"
                  >
                    <span className="sr-only">Verified account</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </Badge>
                )}
                <span
                  className="text-secondary-foreground/68 text-sm"
                  aria-describedby="author-name"
                >
                  @{post.author.username}
                </span>
                <span
                  className="text-secondary-foreground/68 text-sm"
                  aria-label={`Posted ${formatTimestamp(post.created_at)}`}
                >
                  · {formatTimestamp(post.created_at)}
                </span>
              </div>

              {showMenu && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 rounded-full"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-0" align="end">
                    <div className="py-1">
                      {!isOwnPost && (
                        <>
                          <Button
                            variant="ghost"
                            className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                            onClick={() => handleMenuAction("follow")}
                          >
                            <UserPlus className="mr-3 h-4 w-4" />
                            Follow @{post.author.username}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                            onClick={() => handleMenuAction("mute")}
                          >
                            <VolumeX className="mr-3 h-4 w-4" />
                            Mute @{post.author.username}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                            onClick={() => handleMenuAction("block")}
                          >
                            <UserX className="mr-3 h-4 w-4" />
                            Block @{post.author.username}
                          </Button>
                          <Separator />
                        </>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                        onClick={() => handleMenuAction("copy-link")}
                      >
                        <Link className="mr-3 h-4 w-4" />
                        Copy post link
                      </Button>
                      {!isOwnPost && (
                        <Button
                          variant="ghost"
                          className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                          onClick={() => handleMenuAction("report")}
                        >
                          <Flag className="mr-3 h-4 w-4" />
                          Report post
                        </Button>
                      )}
                      {isOwnPost && (
                        <>
                          <Separator />
                          <Button
                            variant="ghost"
                            className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-red-50 text-red-600 hover:text-red-500"
                            onClick={() => handleMenuAction("delete")}
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete post
                          </Button>
                        </>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="space-y-3">
              <p
                className={cn(
                  "text-sm whitespace-pre-wrap",
                  compact && "text-xs"
                )}
              >
                {post.content}
              </p>
              {post.media && post.media.length > 0 && (
                <div className="rounded-lg overflow-hidden border border-accent">
                  {post.media.map((media, index) => (
                    <div key={media.id || index}>
                      {media.media_type === "image" && (
                        <Image
                          src={media.file_path || "/placeholder.svg"}
                          alt="Post media"
                          width={500}
                          height={300}
                          className="w-full object-cover"
                        />
                      )}
                      {media.media_type === "video" && (
                        <video
                          src={media.file_path}
                          controls
                          className="w-full"
                          width={500}
                          height={300}
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        {showStats && (
          <CardFooter className={cn("pt-3 pl-0", compact && "pt-2")}>
            <div
              className={cn(
                "flex justify-between w-full text-accent-foreground",
                compact ? "ml-[36px]" : "ml-[52px]"
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 cursor-pointer hover:text-blue-500 hover:bg-blue-50 rounded-full px-3"
                onClick={handleComment}
                aria-label={`Reply, ${commentCount} replies`}
              >
                <MessageCircle
                  className={cn("h-4 w-4", compact && "h-3 w-3")}
                />
                <span className={cn("text-xs", compact && "text-[10px]")}>
                  {commentCount}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-1 cursor-pointer hover:bg-green-50 rounded-full px-3",
                  isReposted ? "text-green-500" : "hover:text-green-500"
                )}
                onClick={handleRepost}
                aria-label={`${
                  isReposted ? "Undo repost" : "Repost"
                }, ${repostCount} reposts`}
              >
                <Repeat2 className={cn("h-4 w-4", compact && "h-3 w-3")} />
                <span className={cn("text-xs", compact && "text-[10px]")}>
                  {repostCount}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-1 cursor-pointer hover:bg-red-50 rounded-full px-3",
                  isLiked ? "text-red-500" : "hover:text-red-500"
                )}
                onClick={handleLike}
                aria-label={`${
                  isLiked ? "Unlike" : "Like"
                }, ${likeCount} likes`}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    compact && "h-3 w-3",
                    isLiked ? "fill-current" : ""
                  )}
                />
                <span className={cn("text-xs", compact && "text-[10px]")}>
                  {likeCount}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-1 cursor-pointer hover:bg-blue-50 rounded-full px-3",
                  isSaved ? "text-blue-500" : "hover:text-blue-500"
                )}
                onClick={handleSave}
                aria-label={`${isSaved ? "Remove bookmark" : "Bookmark"}`}
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4",
                    compact && "h-3 w-3",
                    isSaved ? "fill-current" : ""
                  )}
                />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center cursor-pointer gap-1 hover:text-blue-500 hover:bg-blue-50 rounded-full px-3"
                    aria-label="Share"
                  >
                    <Share className={cn("h-4 w-4", compact && "h-3 w-3")} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-1" align="end">
                  <Button
                    variant="ghost"
                    className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                    onClick={handleShare}
                  >
                    <Link className="mr-2 h-4 w-4" />
                    Copy link
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-50"
                    onClick={() => handleMenuAction("send-direct-message")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send via direct message
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
