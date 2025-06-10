import { Database } from "./supabase";

// Database table types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Media = Database["public"]["Tables"]["media"]["Row"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Repost = Database["public"]["Tables"]["reposts"]["Row"];
export type SavedItem = Database["public"]["Tables"]["saved_items"]["Row"];

// Extended types for the component
export interface PostWithAuthor extends Post {
  author: User;
  media?: Media[];
  user_has_liked?: boolean;
  user_has_reposted?: boolean;
  user_has_saved?: boolean;
  comments_count?: number;
}

export interface PostInteractionCounts {
  likes_count: number;
  reposts_count: number;
  comments_count: number;
  user_has_liked: boolean;
  user_has_reposted: boolean;
  user_has_saved: boolean;
}

export interface PostActions {
  onLike?: (postId: number, isLiked: boolean) => Promise<void> | void;
  onRepost?: (postId: number, isReposted: boolean) => Promise<void> | void;
  onComment?: (postId: number) => void;
  onSave?: (postId: number, isSaved: boolean) => Promise<void> | void;
  onShare?: (postId: number, url: string) => void;
  onFollow?: (userId: number) => Promise<void> | void;
  onMute?: (userId: number) => Promise<void> | void;
  onBlock?: (userId: number) => Promise<void> | void;
  onReport?: (postId: number) => Promise<void> | void;
  onDelete?: (postId: number) => Promise<void> | void;
}

export interface PostCardProps {
  post: PostWithAuthor;
  currentUserId?: number;
  actions?: PostActions;
  showMenu?: boolean;
  showStats?: boolean;
  className?: string;
  compact?: boolean;
}
