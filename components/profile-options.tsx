"use client";

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Using standard Popover for client components
import { LogOut, UserCircle, Settings, HelpCircle, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client'; // Use client-side Supabase
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/tables.type';
import { Skeleton } from "@/components/ui/skeleton";

function ProfileOptions() {
  const supabase = createClient();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error("Auth error or no user:", authError);
        // Don't redirect here, handle in UI or let parent component decide
        setLoading(false);
        return;
      }

      console.log("Attempting to fetch profile for user ID (UUID):", authData.user.id);
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid")
        .eq("uuid", authData.user.id)
        .single<UserType>();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        setUserProfile(null); // Set to null on error
      } else {
        setUserProfile(profileData);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [supabase]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("Sign out successful");
      setUserProfile(null); // Clear profile on sign out
      router.push('/login'); // Redirect to login after sign out
      router.refresh(); // Refresh server components
    } else {
      console.error("Sign out error:", error);
    }
  };

  const avatarSrc = userProfile?.cover_photo || userProfile?.profile_picture || "/default-avatar.png";

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (!userProfile) {
    // This could be shown if loading is false and userProfile is still null (e.g. auth error, or profile fetch error)
    // Or, more simply, don't render the popover trigger if no user profile
    return (
        <button 
            onClick={() => router.push('/login')}
            className='text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
        >
            Sign In
        </button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
          <Image
            src={avatarSrc}
            alt={`${userProfile.username}'s avatar`}
            width={40} // Standard navbar avatar size
            height={40}
            className="rounded-full object-cover border-2 border-transparent hover:border-primary transition-all"
            priority
            />
        </button>

      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 shadow-xl rounded-lg bg-background border" align="end">
        <div className="space-y-1">
          <div className="flex items-center gap-3 p-2 mb-1">
            <Image
              src={avatarSrc}
              alt={`${userProfile.username}'s avatar`}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate dark:text-gray-50">{userProfile.name || userProfile.username}</p>
              <p className="text-xs text-muted-foreground truncate dark:text-gray-400">
                {userProfile.email}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => { router.push('/profile'); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors dark:hover:bg-gray-700/60"
          >
            <UserCircle size={16} className="text-muted-foreground" />
            View Profile
          </button>

          <button
            onClick={() => { router.push('/settings'); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors dark:hover:bg-gray-700/60"
          >
            <Settings size={16} className="text-muted-foreground" />
            Settings
          </button>

          <button
            // onClick={() => { /* handle support */ setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors dark:hover:bg-gray-700/60"
          >
            <HelpCircle size={16} className="text-muted-foreground" />
            Support
          </button>

          <div className="border-t my-1 dark:border-gray-700" />

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors dark:text-red-400"
          >
            <LogOut size={16} />
            Sign out
          </button>
           <button
            //   onClick={() => handleAccountChange()}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md transition-colors"
            >
            <UserPlus size={16} />
            Change account
          </button> 
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileOptions;