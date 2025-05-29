import { Database } from "./supabase";

export type UserType = Database["public"]["Tables"]["users"]["Row"];
export type BlockedUserType =
  Database["public"]["Tables"]["blocked_users"]["Row"];
export type CartType = Database["public"]["Tables"]["cart"]["Row"];
export type CategoryType = Database["public"]["Tables"]["categories"]["Row"];
export type CommentType = Database["public"]["Tables"]["comments"]["Row"];
export type CountryType = Database["public"]["Tables"]["countries"]["Row"];
export type FollowerType = Database["public"]["Tables"]["followers"]["Row"];
export type HashtagType = Database["public"]["Tables"]["hashtags"]["Row"];
export type InterestType = Database["public"]["Tables"]["interests"]["Row"];
export type ItemAvailabilityType =
  Database["public"]["Tables"]["item_availability"]["Row"];
export type ItemForSaleType =
  Database["public"]["Tables"]["items_for_sale"]["Row"];
export type JobApplicationType =
  Database["public"]["Tables"]["job_applications"]["Row"];
export type JobPostingType =
  Database["public"]["Tables"]["job_postings"]["Row"];
export type LikeType = Database["public"]["Tables"]["likes"]["Row"];
export type MediaType = Database["public"]["Tables"]["media"]["Row"];
export type MessageType = Database["public"]["Tables"]["messages"]["Row"];
export type MutedWordType = Database["public"]["Tables"]["muted_words"]["Row"];
export type NotificationType =
  Database["public"]["Tables"]["notifications"]["Row"];
export type PostHashtagType =
  Database["public"]["Tables"]["post_hashtags"]["Row"];
export type PurchaseHistoryType =
  Database["public"]["Tables"]["purchase_history"]["Row"];
export type QuoteType = Database["public"]["Tables"]["quotes"]["Row"];
export type RepostType = Database["public"]["Tables"]["reposts"]["Row"];
export type ResponseSettingType =
  Database["public"]["Tables"]["response_settings"]["Row"];
export type ResumeType = Database["public"]["Tables"]["resumes"]["Row"];
export type ReviewType = Database["public"]["Tables"]["reviews"]["Row"];
export type SavedItemType = Database["public"]["Tables"]["saved_items"]["Row"];
export type SettingType = Database["public"]["Tables"]["settings"]["Row"];
export type UserActivityLogType =
  Database["public"]["Tables"]["user_activity_log"]["Row"];
export type UserInterestType =
  Database["public"]["Tables"]["user_interests"]["Row"];
export type UserJobApplicationType =
  Database["public"]["Tables"]["user_job_applications"]["Row"];
