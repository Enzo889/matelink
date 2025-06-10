import type { PostWithAuthor } from "@/types/post";

// Helper functions for working with your database
export function formatPostFromDatabase(dbPost: any): PostWithAuthor {
  return {
    ...dbPost,
    author: dbPost.users || dbPost.author,
    media: dbPost.media || [],
    user_has_liked: dbPost.user_has_liked || false,
    user_has_reposted: dbPost.user_has_reposted || false,
    user_has_saved: dbPost.user_has_saved || false,
    comments_count: dbPost.comments_count || 0,
  };
}

export function getPostsQuery() {
  // Example Supabase query structure
  return `
    posts:*,
    users:*,
    media:*,
    likes:count,
    reposts:count,
    comments:count
  `;
}

// Example function to fetch posts with all related data
export async function fetchPostsWithRelations(supabase: any, userId?: number) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:users(*),
      media(*),
      likes(count),
      reposts(count),
      comments(count),
      user_likes:likes!inner(user_id),
      user_reposts:reposts!inner(user_id),
      user_saves:saved_items!inner(user_id)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data?.map(formatPostFromDatabase) || [];
}
