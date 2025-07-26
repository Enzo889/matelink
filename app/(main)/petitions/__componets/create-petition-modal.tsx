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

const categories = [
  "Education",
  "Languages",
  "Technology",
  "Design",
  "Music",
  "Sports",
  "Cooking",
  "Repairs",
  "Cleaning",
  "Personal Care",
  "Transport",
  "Events",
  "Consulting",
  "Others",
];

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
    category: "",
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

    console.log("Petition created:", formData);

    toast(
      <>
        <strong>Petition created successfully!</strong>
        <div>
          Your petition has been published and users with similar interests will
          be notified.
        </div>
      </>
    );

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      petitionType: "",
      budget: "",
      location: "",
      requirements: "",
      interests: [],
      duration: "",
      participants: "",
    });

    onOpenChange(false);
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
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
