"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/tables.type";
import { createClient } from "@/utils/supabase/client";

export const AvatarComponent = ({ className = "w-32 h-32 border-4 border-background", containerClassName = "absolute -bottom-16 left-4" }) => {
    const [userProfile, setUserProfile] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            const supabase = createClient();

            try {
                const { data: authData, error: authError } = await supabase.auth.getUser();
                
                if (authError || !authData?.user) {
                    console.error("Auth error or no user:", authError);
                    setError("Authentication error");
                    setIsLoading(false);
                    return;
                }
                
                console.log(
                    "Attempting to fetch profile for user ID (UUID):",
                    authData.user.id
                );
                
                const { data: profile, error: profileError } = await supabase
                    .from("users")
                    .select(
                        "id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid, created_at"
                    )
                    .eq("uuid", authData.user.id)
                    .single<UserType>();
                
                if (profileError) {
                    console.error("Error fetching user profile:", profileError);
                    setError("Error fetching profile");
                } else {
                    setUserProfile(profile);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserProfile();
    }, []);
    
    if (isLoading) {
        return (
            <div className={containerClassName}>
                <Avatar className={className}>
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
            </div>
        );
    }
    
    if (error || !userProfile) {
        return (
            <div className={containerClassName}>
                <Avatar className={className}>
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
            </div>
        );
    }
    
    const profileAvatarSrc = userProfile.profile_picture || "/default-avatar.png";
    const displayName = userProfile.name ? userProfile.name : userProfile.username || "User";

    

    
  return (
    <div className={containerClassName}>
      <Avatar className={className}>
        <AvatarImage src={profileAvatarSrc} alt={`${displayName}'s profile picture`} />
        <AvatarFallback className="text-2xl">
          {displayName.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
