import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { UserType } from "@/types/tables.type"; // Assuming UserType is defined here
import { Button } from "./ui/button";
import { EllipsisIcon } from "lucide-react";
import BackButton from "./back-button";

export default async function UsersProfile() {
  const supabase = await createClient(); // createClient() itself might be async or return a promise-like object depending on its implementation

  // Ensure supabase client is resolved before use if it's a promise, though typically it's an instance.
  // For this example, assuming createClient() returns the client instance directly or a promise that resolves to it.
  // If createClient is async: const supabaseClient = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    console.error("Auth error or no user:", authError);
    redirect("/login");
  }

  // Log the user ID being used for the query
  console.log(
    "Attempting to fetch profile for user ID (UUID):",
    authData.user.id
  );

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select(
      "id, name, username, email, description, profile_picture, cover_photo, website, residence, birthday, is_company, surname, uuid"
    )
    .eq("uuid", authData.user.id) // Match using the UUID from authData.user.id
    .single<UserType>();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    // Optionally, redirect or show an error message
    // For now, we'll proceed but some data might be missing
  }

  if (!userProfile) {
    // This case might happen if the user exists in auth but not in the users table
    // Or if there was an error and profileError was handled by just logging
    return <p>User profile not found.</p>;
  }

  // Use cover_photo for avatar, fallback to profile_picture or a default
  const avatarSrc =
    userProfile.cover_photo ||
    userProfile.profile_picture ||
    "/default-avatar.png"; // Add a default avatar in /public

  return (
    <div className="container ">
      <div className="bg-card shadow-md rounded-lg px-6 py-2">
        <Image
          src={userProfile.cover_photo || "/cover-default-photo.jpeg"}
          alt={`${userProfile.username}'s cover photo`}
          width={1500}
          height={1500}
          className="w-full  object-cover rounded-lg mb-4"
        />
        <BackButton />
        <div className="flex flex-col  items-start space-y-1 mb-6">
          <div className="flex justify-between items-center w-full">
            <Image
              src={avatarSrc}
              alt={`${userProfile.username}'s avatar`}
              width={100}
              height={100}
              className="rounded-full object-cover"
              priority // If it's above the fold
            />
            <div className="flex items-center space-x-2 ">
              <Button size={"sm"} variant={"outline"}>
                Edit Profile
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                className="rounded-full ml-2"
              >
                <EllipsisIcon />
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {userProfile.name.split(" ")[0]}{" "}
              {userProfile.surname.split(" ")[1]}
            </h1>
            <p className="text-secondary-foreground ">
              @{userProfile.username.replaceAll(" ", "").toLowerCase()}
            </p>
            {userProfile.is_company && (
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Company
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-secondary-foreground whitespace-pre-wrap">
            {userProfile.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p className="text-secondary-foreground ">{userProfile.email}</p>
          </div>
          {userProfile.website && (
            <div>
              <h3 className="font-semibold">Website:</h3>
              <a
                href={userProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {userProfile.website}
              </a>
            </div>
          )}
          {userProfile.residence && (
            <div>
              <h3 className="font-semibold">Residence:</h3>
              <p className="text-secondary-foreground ">
                {userProfile.residence}
              </p>
            </div>
          )}
          {userProfile.birthday && (
            <div>
              <h3 className="font-semibold">Birthday:</h3>
              <p className="text-secondary-foreground ">
                {new Date(userProfile.birthday).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* You can add more sections here, e.g., posts, activity, etc. */}
      </div>
    </div>
  );
}
