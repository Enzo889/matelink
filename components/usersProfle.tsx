import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { UserType } from "@/types/tables.type";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, LinkIcon, MapPin,  Edit } from "lucide-react";
import BackButton from "./back-button"; 

export default async function UsersProfile() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    console.error("Auth error or no user:", authError);
    redirect("/login");
  }

  console.log(
    "Attempting to fetch profile for user ID (UUID):",
    authData.user.id
  );

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select(
      "id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid, created_at"
    )
    .eq("uuid", authData.user.id)
    .single<UserType>();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    // Consider a more user-friendly error display or redirect
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-500">User profile not found.</p>
        <p>There might be an issue fetching the profile data or the profile does not exist.</p>
        <BackButton />
      </div>
    );
  }

  const profileAvatarSrc =
    userProfile.profile_picture || "/default-avatar.png";
  const coverPhotoSrc = 
    userProfile.cover_photo || "/cover-default-photo.jpeg";
  
  // Fallback for name if it's not split correctly or parts are missing
  const displayName = userProfile.name ? userProfile.name : userProfile.username || "User";
  const displayUsername = userProfile.username ? `@${userProfile.username.replaceAll(" ", "").toLowerCase()}` : "@username";
  const joinedDate = userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Not available";

  return (
    <div className="w-full">
      {/* Header/Cover Image */}
      <div className="relative">
        <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
          <Image 
            src={coverPhotoSrc} 
            alt={`${displayName}'s cover photo`} 
            fill 
            className="object-cover" 
            priority
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-4">
          <Avatar className="w-32 h-32 border-4 border-background">
            <AvatarImage src={profileAvatarSrc} alt={`${displayName}'s profile picture`} />
            <AvatarFallback className="text-2xl">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Action Buttons on Cover */}
        <div className="absolute top-0 flex justify-between bg-background w-full pt-4 px-2 ">
          <BackButton /> {/* Moved BackButton here for better UX */}
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 ">
            Follow
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-20 pb-4">
        {/* Action Buttons Row */}
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" className="rounded-full">
            Message
          </Button>
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            Follow
          </Button>
           <Button variant="outline" className="rounded-full">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>

        {/* Name and Handle */}
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1">
            <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
            {userProfile.is_company && (
              <Badge variant="secondary" className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                Company
              </Badge>
            )}
            {/* Example of a verified badge, can be conditional */}
            {/* <Badge variant="secondary" className="bg-blue-500 text-white text-xs px-1 py-0">
              ✓
            </Badge> */}
          </div>
          <p className="text-muted-foreground">{displayUsername}</p>
        </div>

        {/* Bio */}
        <div className="mb-3">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {userProfile.description || "No bio provided. ✨"}
          </p>
        </div>

        {/* Location, Website, Joined Date */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-muted-foreground text-sm">
          {userProfile.residence && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{userProfile.residence}</span>
            </div>
          )}
          {userProfile.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {userProfile.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {joinedDate}</span>
          </div>
           {userProfile.birthday && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {/* Consider a different icon for birthday */}
              <span>Born {new Date(userProfile.birthday).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Following/Followers Stats - Placeholder data for now */}
        <div className="flex gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">1,234</span>
            <span className="text-muted-foreground hover:underline cursor-pointer">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">5,678</span>
            <span className="text-muted-foreground hover:underline cursor-pointer">Followers</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {["Posts", "Replies", "Highlights", "Media", "Likes"].map((tab) => (
            <button 
              key={tab}
              className={`flex-1 min-w-[80px] py-3 px-2 text-center text-sm font-medium ${ 
                tab === "Posts" 
                  ? "text-foreground border-b-2 border-blue-500"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } transition-colors duration-150 ease-in-out`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      {/* Content for tabs would go here */}
    </div>
  );
}
