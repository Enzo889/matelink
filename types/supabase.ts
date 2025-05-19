export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blocked_users: {
        Row: {
          blocked_at: string | null
          blocked_id: number | null
          blocker_id: number | null
          id: number
        }
        Insert: {
          blocked_at?: string | null
          blocked_id?: number | null
          blocker_id?: number | null
          id?: never
        }
        Update: {
          blocked_at?: string | null
          blocked_id?: number | null
          blocker_id?: number | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "blocked_users_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          added_at: string | null
          id: number
          item_id: number | null
          quantity: number
          user_id: number | null
        }
        Insert: {
          added_at?: string | null
          id?: never
          item_id?: number | null
          quantity: number
          user_id?: number | null
        }
        Update: {
          added_at?: string | null
          id?: never
          item_id?: number | null
          quantity?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: number
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      followers: {
        Row: {
          followed_at: string | null
          followed_id: number | null
          follower_id: number | null
          id: number
        }
        Insert: {
          followed_at?: string | null
          followed_id?: number | null
          follower_id?: number | null
          id?: never
        }
        Update: {
          followed_at?: string | null
          followed_id?: number | null
          follower_id?: number | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "followers_followed_id_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "followers_followed_id_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      interests: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      item_availability: {
        Row: {
          country_id: number
          item_id: number
        }
        Insert: {
          country_id: number
          item_id: number
        }
        Update: {
          country_id?: number
          item_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_availability_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_availability_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_availability_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
        ]
      }
      items_for_sale: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string
          id: number
          is_available: boolean | null
          is_paused: boolean | null
          price: number
          rating: number | null
          title: string
          user_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description: string
          id?: never
          is_available?: boolean | null
          is_paused?: boolean | null
          price: number
          rating?: number | null
          title: string
          user_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string
          id?: never
          is_available?: boolean | null
          is_paused?: boolean | null
          price?: number
          rating?: number | null
          title?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "items_for_sale_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_for_sale_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "items_for_sale_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string | null
          company_id: number | null
          id: number
          job_title: string
          resume_id: number | null
          status: string | null
          user_id: number | null
        }
        Insert: {
          applied_at?: string | null
          company_id?: number | null
          id?: never
          job_title: string
          resume_id?: number | null
          status?: string | null
          user_id?: number | null
        }
        Update: {
          applied_at?: string | null
          company_id?: number | null
          id?: never
          job_title?: string
          resume_id?: number | null
          status?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "job_applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "job_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          company_id: number | null
          created_at: string | null
          description: string
          id: number
          location: string | null
          title: string
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          description: string
          id?: never
          location?: string | null
          title: string
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          description?: string
          id?: never
          location?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "job_postings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: number
          is_like: boolean
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_like: boolean
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          is_like?: boolean
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          created_at: string | null
          file_path: string
          id: number
          media_type: string | null
          post_id: number | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          id?: never
          media_type?: string | null
          post_id?: number | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          id?: never
          media_type?: string | null
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          id: number
          receiver_id: number | null
          sender_id: number | null
          sent_at: string | null
        }
        Insert: {
          content: string
          id?: never
          receiver_id?: number | null
          sender_id?: number | null
          sent_at?: string | null
        }
        Update: {
          content?: string
          id?: never
          receiver_id?: number | null
          sender_id?: number | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      muted_words: {
        Row: {
          created_at: string | null
          id: number
          user_id: number | null
          word: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          user_id?: number | null
          word: string
        }
        Update: {
          created_at?: string | null
          id?: never
          user_id?: number | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "muted_words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "muted_words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: number
          is_read: boolean | null
          user_id: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          user_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_hashtags: {
        Row: {
          hashtag_id: number
          post_id: number
        }
        Insert: {
          hashtag_id: number
          post_id: number
        }
        Update: {
          hashtag_id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_hashtags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_hashtags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          allow_quotes: boolean | null
          content: string
          created_at: string | null
          id: number
          likes_count: number | null
          repost_count: number | null
          user_id: number | null
        }
        Insert: {
          allow_quotes?: boolean | null
          content: string
          created_at?: string | null
          id?: never
          likes_count?: number | null
          repost_count?: number | null
          user_id?: number | null
        }
        Update: {
          allow_quotes?: boolean | null
          content?: string
          created_at?: string | null
          id?: never
          likes_count?: number | null
          repost_count?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_history: {
        Row: {
          buyer_id: number | null
          id: number
          item_id: number | null
          purchase_date: string | null
          quantity: number
          total_price: number
        }
        Insert: {
          buyer_id?: number | null
          id?: never
          item_id?: number | null
          purchase_date?: string | null
          quantity: number
          total_price: number
        }
        Update: {
          buyer_id?: number | null
          id?: never
          item_id?: number | null
          purchase_date?: string | null
          quantity?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_history_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "purchase_history_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_history_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_history_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
        ]
      }
      quotes: {
        Row: {
          content: string
          created_at: string | null
          id: number
          original_post_id: number | null
          user_id: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          original_post_id?: number | null
          user_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          original_post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reposts: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reposts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reposts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      response_settings: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          response_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          response_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          response_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "response_settings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_settings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
        ]
      }
      resumes: {
        Row: {
          created_at: string | null
          file_path: string
          id: number
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          id?: never
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          id?: never
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          item_id: number | null
          rating: number | null
          user_id: number | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: never
          item_id?: number | null
          rating?: number | null
          user_id?: number | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: never
          item_id?: number | null
          rating?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_items: {
        Row: {
          created_at: string | null
          id: number
          item_id: number | null
          job_posting_id: number | null
          post_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          job_posting_id?: number | null
          post_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          item_id?: number | null
          job_posting_id?: number | null
          post_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
          {
            foreignKeyName: "saved_items_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "saved_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "saved_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          id: number
          setting_name: string
          setting_value: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          id?: never
          setting_name: string
          setting_value?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          id?: never
          setting_name?: string
          setting_value?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_log: {
        Row: {
          activity_details: string | null
          activity_type: string
          created_at: string | null
          id: number
          user_id: number | null
        }
        Insert: {
          activity_details?: string | null
          activity_type: string
          created_at?: string | null
          id?: never
          user_id?: number | null
        }
        Update: {
          activity_details?: string | null
          activity_type?: string
          created_at?: string | null
          id?: never
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interests: {
        Row: {
          interest_id: number
          user_id: number
        }
        Insert: {
          interest_id: number
          user_id: number
        }
        Update: {
          interest_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_job_applications: {
        Row: {
          applied_at: string | null
          id: number
          job_posting_id: number | null
          resume_id: number | null
          status: string | null
          user_id: number | null
        }
        Insert: {
          applied_at?: string | null
          id?: never
          job_posting_id?: number | null
          resume_id?: number | null
          status?: string | null
          user_id?: number | null
        }
        Update: {
          applied_at?: string | null
          id?: never
          job_posting_id?: number | null
          resume_id?: number | null
          status?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_job_applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_job_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_job_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          birthday: string | null
          cover_photo: string | null
          created_at: string | null
          description: string | null
          email: string
          id: number
          is_active: boolean | null
          is_company: boolean | null
          name: string
          password: string
          profile_picture: string | null
          residence: string | null
          surname: string
          username: string
          website: string | null
        }
        Insert: {
          birthday?: string | null
          cover_photo?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          id?: never
          is_active?: boolean | null
          is_company?: boolean | null
          name: string
          password: string
          profile_picture?: string | null
          residence?: string | null
          surname: string
          username: string
          website?: string | null
        }
        Update: {
          birthday?: string | null
          cover_photo?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          id?: never
          is_active?: boolean | null
          is_company?: boolean | null
          name?: string
          password?: string
          profile_picture?: string | null
          residence?: string | null
          surname?: string
          username?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_profile_wall: {
        Row: {
          birthday: string | null
          comment_content: string | null
          comment_created_at: string | null
          comment_id: number | null
          cover_photo: string | null
          description: string | null
          is_available: boolean | null
          item_for_sale_id: number | null
          item_price: number | null
          item_title: string | null
          like_created_at: string | null
          like_id: number | null
          liked_post_id: number | null
          media_created_at: string | null
          media_file_path: string | null
          media_id: number | null
          media_type: string | null
          post_content: string | null
          post_created_at: string | null
          post_id: number | null
          profile_picture: string | null
          purchase_date: string | null
          purchase_id: number | null
          purchased_item_id: number | null
          residence: string | null
          total_price: number | null
          user_id: number | null
          username: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["liked_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["liked_post_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "purchase_history_item_id_fkey"
            columns: ["purchased_item_id"]
            isOneToOne: false
            referencedRelation: "items_for_sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_history_item_id_fkey"
            columns: ["purchased_item_id"]
            isOneToOne: false
            referencedRelation: "user_profile_wall"
            referencedColumns: ["item_for_sale_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
