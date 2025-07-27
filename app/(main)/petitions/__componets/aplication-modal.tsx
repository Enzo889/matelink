"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  DollarSign,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  petition: {
    id: string;
    title: string;
    description: string;
    category: string;
    petitionType: string;
    budget: string;
    location: string;
    tags: string[];
    duration: string;
    participants: string;
    postedBy: string;
    requirements: string;
  };
}

export function ApplicationModal({
  open,
  onOpenChange,
  petition,
}: ApplicationModalProps) {
  const [applicationData, setApplicationData] = useState({
    message: "",
    expectedSalary: "",
    availability: "",
    portfolio: "",
    cv: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setApplicationData((prev) => ({ ...prev, cv: file }));
    }
  };

  const uploadFile = async (
    file: File,
    userId: string,
    petitionId: string
  ): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}_${petitionId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`; // Simplified path without subfolder

      const { data, error: uploadError } = await supabase.storage
        .from("applications")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast.error(`File upload failed: ${uploadError.message}`);
        return null;
      }

      return data.path;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Unexpected error during file upload");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.error("You must be logged in to apply");
        setIsSubmitting(false);
        return;
      }

      // Check if user has already applied to this petition
      const { data: existingApplication } = await supabase
        .from("applications")
        .select("id")
        .eq("petition_id", Number(petition.id))
        .eq("applicant_uuid", user.id)
        .single();

      if (existingApplication) {
        toast.error("You have already applied to this petition");
        setIsSubmitting(false);
        return;
      }

      // Upload CV file if provided
      let cvPath: string | null = null;
      if (applicationData.cv) {
        try {
          cvPath = await uploadFile(applicationData.cv, user.id, petition.id);
          if (!cvPath) {
            // If file upload fails, continue without CV but warn user
            toast.error(
              "CV upload failed, but your application will be submitted without it."
            );
          }
        } catch (error) {
          console.error("File upload error:", error);
          toast.error(
            "CV upload failed, but your application will be submitted without it."
          );
        }
      }

      // Insert application into database
      const { error: applicationError } = await supabase
        .from("applications")
        .insert([
          {
            petition_id: Number(petition.id),
            applicant_uuid: user.id,
            message: applicationData.message,
            expected_salary: applicationData.expectedSalary || null,
            availability: applicationData.availability || null,
            portfolio: applicationData.portfolio || null,
            cv_url: cvPath,
            status: "pending",
          },
        ]);

      if (applicationError) {
        console.error("Error creating application:", applicationError);
        toast.error("Failed to submit application. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Get petition owner's UUID for notification
      const { data: petitionOwner } = await supabase
        .from("petitions")
        .select("user_uuid")
        .eq("id", Number(petition.id))
        .single();

      // Create notification for petition owner
      if (petitionOwner?.user_uuid) {
        // Get the user's numeric ID from the users table
        const { data: ownerData } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", petitionOwner.user_uuid)
          .single();

        if (ownerData?.id) {
          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                user_id: ownerData.id,
                title: "New Application Received",
                message: `Someone applied to your petition "${petition.title}"`,
                type: "application",
                petition_id: Number(petition.id),
                is_read: false,
              },
            ]);

          if (notificationError) {
            console.error("Error creating notification:", notificationError);
            // Don't fail the application submission if notification fails
          }
        }
      }

      toast.success(
        <>
          <strong>Application submitted successfully!</strong>
          <div>
            Your application for &quot;{petition.title}&quot; has been sent to
            the petition owner.
          </div>
        </>
      );

      // Reset form and close modal
      setApplicationData({
        message: "",
        expectedSalary: "",
        availability: "",
        portfolio: "",
        cv: null,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply to Petition</DialogTitle>
        </DialogHeader>

        {/* Petition Summary */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
          <h3 className="font-bold text-lg">{petition.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{petition.budget}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{petition.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{petition.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{petition.participants}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {petition.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          {petition.requirements && (
            <div>
              <p className="font-medium mb-1">Requirements:</p>
              <p className="text-sm text-muted-foreground">
                {petition.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Rest of the form remains the same */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="message">
              Why are you the ideal person for this petition? *
            </Label>
            <Textarea
              id="message"
              value={applicationData.message}
              onChange={(e) =>
                setApplicationData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              placeholder="Explain your experience, skills and why you should be chosen for this petition..."
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                value={applicationData.expectedSalary}
                onChange={(e) =>
                  setApplicationData((prev) => ({
                    ...prev,
                    expectedSalary: e.target.value,
                  }))
                }
                placeholder="E.g.: $800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={applicationData.availability}
                onChange={(e) =>
                  setApplicationData((prev) => ({
                    ...prev,
                    availability: e.target.value,
                  }))
                }
                placeholder="E.g.: Immediate, In 2 weeks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio/Links (optional)</Label>
            <Input
              id="portfolio"
              value={applicationData.portfolio}
              onChange={(e) =>
                setApplicationData((prev) => ({
                  ...prev,
                  portfolio: e.target.value,
                }))
              }
              placeholder="Links to your portfolio, GitHub, LinkedIn, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv">Curriculum Vitae (optional)</Label>
            <p className="text-sm text-muted-foreground mb-2">
              You can submit your application without a CV. Upload one to
              strengthen your application.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="cv" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {applicationData.cv ? (
                    <>
                      <FileText className="h-8 w-8 text-green-600" />
                      <p className="font-medium">{applicationData.cv.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(applicationData.cv.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setApplicationData((prev) => ({ ...prev, cv: null }));
                        }}
                        className="mt-2"
                      >
                        Remove CV
                      </Button>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="font-medium">
                        Upload Curriculum (Optional)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC or DOCX (max. 10MB) - or skip this step
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
