"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, DollarSign, MapPin, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface CreatePetitionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Interest {
  id: number;
  name: string;
}

export interface Petition {
  id: number;
  user_uuid: string | null;
  title: string | null;
  description: string | null;
  category: number | null; // Ahora es un número (ID del interés)
  petition_type: string | null;
  budget: string | null;
  location: string | null;
  requirements: string | null;
  duration: string | null;
  participants: string | null;
  created_at: string | null;
}
export interface Notification {
  id: number; // bigint → number
  user_id: number | null; // bigint → number | null
  message: string; // text → string
  is_read: boolean | null; // boolean → boolean | null
  created_at: string | null; // timestamp → string ISO
  noti_uuid: string | null; // uuid → string | null
  type: string | null; // text → string | null
  title: string | null; // text → string | null
  petition_id: number | null; // integer → number | null
}

export interface PetitionTag {
  id: number; // serial → number
  petition_id: number | null; // integer → number | null
  tag: string | null; // text → string | null
}

const petitionTypes = [
  "Looking for Service",
  "Offering Service",
  "Exchange",
  "Collaboration",
];

export function CreatePetitionModal({
  open,
  onOpenChange,
}: CreatePetitionModalProps) {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: null as Interest | null,
    petitionType: "",
    budget: "",
    location: "",
    requirements: "",
    interests: [] as Interest[],
    duration: "",
    participants: "",
  });
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [selectedInterestId, setSelectedInterestId] = useState("");

  // Fetch interests from Supabase
  useEffect(() => {
    const fetchInterests = async () => {
      const { data } = await supabase.from("interests").select("id, name");
      setAvailableInterests(data ?? []);
    };
    fetchInterests();
  }, [supabase]);

  const handleAddInterest = () => {
    if (!selectedInterestId) return;

    const interest = availableInterests.find(
      (i) => i.id.toString() === selectedInterestId
    );
    if (interest && !formData.interests.some((i) => i.id === interest.id)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
      setSelectedInterestId("");
    }
  };

  const handleRemoveInterest = (interestId: number) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i.id !== interestId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.error("You must be logged in to create a petition");
        return;
      }

      // Insert petition
      const { data: petitionData, error: petitionError } = await supabase
        .from("petitions")
        .insert([
          {
            user_uuid: user.id,
            title: formData.title,
            description: formData.description,
            category: formData.category.id, // Guardar el ID del interés, no el nombre
            petition_type: formData.petitionType,
            budget: formData.budget || null,
            location: formData.location || null,
            requirements: formData.requirements || null,
            duration: formData.duration || null,
            participants: formData.participants || null,
          },
        ])
        .select()
        .single();

      if (petitionError || !petitionData) {
        console.error("Error creating petition:", petitionError);
        toast.error("Failed to create petition");
        return;
      }

      // Insert petition tags (interests)
      if (formData.interests.length > 0) {
        const petitionTags = formData.interests.map((interest) => ({
          petition_id: petitionData.id,
          tag: interest.name,
        }));

        const { error: tagsError } = await supabase
          .from("petition_tags")
          .insert(petitionTags);

        if (tagsError) {
          console.error("Error adding petition tags:", tagsError);
        }
      }

      // Find users with the same category interest and send notifications
      console.log("Looking for users with interest_id:", formData.category?.id);

      const { data: usersWithInterest, error: usersError } = await supabase
        .from("user_interests")
        .select(
          `
          user_id,
          users!user_interests_user_id_fkey(uuid)
        `
        )
        .eq("interest_id", formData.category.id);

      console.log("Users with interest query result:", {
        usersWithInterest,
        usersError,
      });

      if (usersError) {
        console.error("Error finding users with interest:", usersError);
      } else if (usersWithInterest && usersWithInterest.length > 0) {
        // Filter out the petition creator
        const filteredUsers = usersWithInterest.filter(
          (userInterest: any) => userInterest.users?.uuid !== user.id
        );

        console.log("Filtered users (excluding creator):", filteredUsers);

        if (filteredUsers.length > 0) {
          // Create notifications for users with matching interests (excluding creator)
          const notifications = filteredUsers.map((userInterest: unknown) => ({
            user_id: userInterest.user_id,
            title: "New Petition in Your Interest Area",
            message: `A new petition "${formData.title}" has been created in ${
              formData.category?.name || "Unknown Category"
            }`,
            type: "job_match",
            petition_id: petitionData.id,
            is_read: false,
          }));

          console.log("Notifications to be created:", notifications);

          const { error: notificationError } = await supabase
            .from("notifications")
            .insert(notifications);

          if (notificationError) {
            console.error("Error creating notifications:", notificationError);
          } else {
            console.log("Notifications created successfully!");
          }
        } else {
          console.log("No users to notify (excluding creator)");
        }
      } else {
        console.log("No users found with this interest");
      }

      toast.success(
        <>
          <strong>Petition created successfully!</strong>
          <div>
            Your petition has been published and users with similar interests
            will be notified.
          </div>
        </>
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: null,
        petitionType: "",
        budget: "",
        location: "",
        requirements: "",
        interests: [],
        duration: "",
        participants: "",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Petition</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Petition Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="E.g.: Looking for beginner English teacher"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category?.id.toString() || ""}
                onValueChange={(value) => {
                  const selectedCategory = availableInterests.find(
                    (interest) => interest.id.toString() === value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    category: selectedCategory || null,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableInterests.map((interest) => (
                    <SelectItem
                      key={interest.id}
                      value={interest.id.toString()}
                    >
                      {interest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="petitionType">Petition Type *</Label>
              <Select
                value={formData.petitionType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, petitionType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {petitionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Petition Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe in detail what you need or offer..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget/Price
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, budget: e.target.value }))
                }
                placeholder="E.g.: $20/hour, $500 total, Free"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="E.g.: Online, New York, My house"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: e.target.value }))
                }
                placeholder="E.g.: 1 hour, 3 months, Permanent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants
              </Label>
              <Input
                id="participants"
                value={formData.participants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    participants: e.target.value,
                  }))
                }
                placeholder="E.g.: 1 person, Group of 5, Unlimited"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">
              Requirements/Additional Details
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  requirements: e.target.value,
                }))
              }
              placeholder="Mention any specific requirement, necessary experience, materials, etc..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Interests</Label>
            <div className="flex gap-2">
              <Select
                value={selectedInterestId}
                onValueChange={setSelectedInterestId}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select an interest" />
                </SelectTrigger>
                <SelectContent>
                  {availableInterests
                    .filter(
                      (interest) =>
                        !formData.interests.some((i) => i.id === interest.id)
                    )
                    .map((interest) => (
                      <SelectItem
                        key={interest.id}
                        value={interest.id.toString()}
                      >
                        {interest.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleAddInterest}
                variant="outline"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map((interest) => (
                <Badge
                  key={interest.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {interest.name}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveInterest(interest.id)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80"
              onClick={handleSubmit}
            >
              Publish Petition
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
