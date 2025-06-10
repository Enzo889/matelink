"use client";

import { PostActions, PostWithAuthor } from "@/types/post";
import { PostCard } from "./post-card";
// Sample data matching your database structure
const samplePosts: PostWithAuthor[] = [
  {
    id: 1,
    content:
      "pensé que sería muy fácil para la IA generarme un fondo jajaj pero resultó que agregaba 2 fondos y no se comportaban nunca como yo esperaba, después de 2 horas de preguntarle y hartarme de la IA terminé agregando un polygon2d y listo 😂😂",
    created_at: "2024-01-15T10:30:00Z",
    user_id: 1,
    likes_count: 105,
    repost_count: 1,
    allow_quotes: true,
    author: {
      id: 1,
      uuid: "user-uuid-1",
      name: "Jess",
      surname: "Developer",
      username: "jeznon_oficial",
      email: "jess@example.com",
      password: "", // Never expose in real app
      profile_picture: "/placeholder.svg?height=32&width=32",
      cover_photo: null,
      description: "Linux Witch | Developer",
      website: "https://jessdev.com",
      residence: "Remote",
      birthday: "1995-06-15",
      is_company: true,
      is_active: true,
      created_at: "2023-01-01T00:00:00Z",
    },
    media: [
      {
        id: 1,
        file_path: "/default-avatar.png",
        media_type: "image",
        post_id: 1,
        created_at: "2024-01-15T10:30:00Z",
      },
    ],
    user_has_liked: false,
    user_has_reposted: false,
    user_has_saved: false,
    comments_count: 2,
  },
  {
    id: 2,
    content:
      "¡Acabo de terminar mi primer proyecto en React! 🎉 Ha sido todo un desafío pero estoy muy orgullosa del resultado. Gracias a todos los que me ayudaron en el camino.",
    created_at: "2024-01-15T07:30:00Z",
    user_id: 2,
    likes_count: 42,
    repost_count: 8,
    allow_quotes: true,
    author: {
      id: 2,
      uuid: "user-uuid-2",
      name: "María",
      surname: "García",
      username: "maria_dev",
      email: "maria@example.com",
      password: "",
      profile_picture: "/placeholder.svg?height=32&width=32",
      cover_photo: null,
      description: "Frontend Developer",
      website: null,
      residence: "Madrid, Spain",
      birthday: "1992-03-20",
      is_company: false,
      is_active: true,
      created_at: "2023-06-01T00:00:00Z",
    },
    media: [],
    user_has_liked: true,
    user_has_reposted: false,
    user_has_saved: true,
    comments_count: 15,
  },
  {
    id: 3,
    content:
      "Tip del día: Siempre documenta tu código como si la persona que lo va a mantener fuera un psicópata violento que sabe dónde vives. 😅",
    created_at: "2024-01-15T05:30:00Z",
    user_id: 3,
    likes_count: 234,
    repost_count: 45,
    allow_quotes: true,
    author: {
      id: 3,
      uuid: "user-uuid-3",
      name: "Carlos",
      surname: "Tech",
      username: "carlos_tech",
      email: "carlos@example.com",
      password: "",
      profile_picture: "/placeholder.svg?height=32&width=32",
      cover_photo: null,
      description: "Senior Developer & Tech Lead",
      website: "https://carlostech.dev",
      residence: "Barcelona, Spain",
      birthday: "1988-11-10",
      is_company: true,
      is_active: true,
      created_at: "2022-03-15T00:00:00Z",
    },
    media: [],
    user_has_liked: false,
    user_has_reposted: true,
    user_has_saved: false,
    comments_count: 28,
  },
];

function Post() {
  const currentUserId = 1; // Simulated current user

  // Database-aligned action handlers
  const postActions: PostActions = {
    onLike: async (postId, isLiked) => {
      console.log(`${isLiked ? "Liked" : "Unliked"} post ${postId}`);
      // Here you would call your Supabase function to insert/delete from likes table
      // await supabase.from('likes').insert({ post_id: postId, user_id: currentUserId, is_like: true })
    },
    onRepost: async (postId, isReposted) => {
      console.log(`${isReposted ? "Reposted" : "Unreposted"} post ${postId}`);
      // await supabase.from('reposts').insert({ post_id: postId, user_id: currentUserId })
    },
    onComment: (postId) => {
      console.log(`Comment on post ${postId}`);
      // Navigate to post detail or open comment modal
    },
    onSave: async (postId, isSaved) => {
      console.log(`${isSaved ? "Saved" : "Unsaved"} post ${postId}`);
      // await supabase.from('saved_items').insert({ post_id: postId, user_id: currentUserId })
    },
    onShare: (postId, url) => {
      console.log(`Shared post ${postId}: ${url}`);
    },
    onFollow: async (userId) => {
      console.log(`Follow user ${userId}`);
      // await supabase.from('followers').insert({ follower_id: currentUserId, followed_id: userId })
    },
    onMute: async (userId) => {
      console.log(`Mute user ${userId}`);
      // Add to muted users or user settings
    },
    onBlock: async (userId) => {
      console.log(`Block user ${userId}`);
      // await supabase.from('blocked_users').insert({ blocker_id: currentUserId, blocked_id: userId })
    },
    onReport: async (postId) => {
      console.log(`Report post ${postId}`);
      // Handle reporting logic
    },
    onDelete: async (postId) => {
      console.log(`Delete post ${postId}`);
      // await supabase.from('posts').delete().eq('id', postId).eq('user_id', currentUserId)
    },
  };

  return (
    <div>
      {samplePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          actions={postActions}
          showMenu={true}
          showStats={true}
          className="w-full mx-auto"
          compact={false}
        />
      ))}
    </div>
  );
}

export default Post;
