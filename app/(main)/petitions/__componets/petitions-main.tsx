"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle } from "lucide-react";
import { ApplicationReviewModal } from "./application-review-modal";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface PetitionData {
  id: number;
  title: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
  applications: ApplicationData[];
}

interface ApplicationData {
  id: number;
  applicantName: string;
  message: string;
  expectedSalary: string | null;
  availability: string | null;
  portfolio: string | null;
  appliedAt: string | null;
  status: string;
  cv_url: string | null;
}

interface UserApplicationData {
  id: number;
  jobTitle: string;
  company: string;
  status: string;
  appliedAt: string;
  message: string;
}

export function PetitionsMain() {
  const [myJobs, setMyJobs] = useState<PetitionData[]>([]);
  const [myApplications, setMyApplications] = useState<UserApplicationData[]>(
    []
  );
  const [selectedJob, setSelectedJob] = useState<PetitionData | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchUserPetitions = useCallback(
    async (userId: string) => {
      try {
        // Get petitions created by the user
        const { data: petitions, error: petitionsError } = await supabase
          .from("petitions")
          .select("*")
          .eq("user_uuid", userId)
          .order("created_at", { ascending: false });

        if (petitionsError) {
          console.error("Error fetching petitions:", petitionsError);
          return;
        }

        // For each petition, get applications count and applications data
        const enrichedPetitions: PetitionData[] = await Promise.all(
          (petitions || []).map(async (petition) => {
            // Get applications for this petition
            const { data: applications, error: appsError } = await supabase
              .from("applications")
              .select("*")
              .eq("petition_id", petition.id)
              .order("created_at", { ascending: false });

            if (appsError) {
              console.error("Error fetching applications:", appsError);
            }

            const enrichedApplications: ApplicationData[] = await Promise.all(
              (applications || []).map(async (app) => {
                // Fetch user data separately for each application
                let applicantName = "Anonymous User";
                if (app.applicant_uuid) {
                  const { data: userData } = await supabase
                    .from("users")
                    .select("name, email")
                    .eq("uuid", app.applicant_uuid)
                    .single();

                  applicantName =
                    userData?.name || userData?.email || "Anonymous User";
                }

                return {
                  id: app.id,
                  applicantName,
                  message: app.message,
                  expectedSalary: app.expected_salary,
                  availability: app.availability,
                  portfolio: app.portfolio,
                  appliedAt: app.created_at,
                  status: app.status || "pending",
                  cv_url: app.cv_url,
                };
              })
            );

            return {
              id: petition.id,
              title: petition.title || "Untitled Petition",
              status: "active", // You can add a status field to petitions table if needed
              applicationsCount: enrichedApplications.length,
              createdAt: petition.created_at || new Date().toISOString(),
              applications: enrichedApplications,
            };
          })
        );

        setMyJobs(enrichedPetitions);
      } catch (error) {
        console.error("Error fetching user petitions:", error);
      }
    },
    [supabase]
  );

  const fetchUserApplications = useCallback(
    async (userId: string) => {
      try {
        // Get applications submitted by the user
        const { data: applications, error: appsError } = await supabase
          .from("applications")
          .select(
            `
					*,
					petitions!applications_petition_id_fkey(title, user_uuid)
				`
          )
          .eq("applicant_uuid", userId)
          .order("created_at", { ascending: false });

        if (appsError) {
          console.error("Error fetching user applications:", appsError);
          return;
        }

        // Get petition owner names
        const enrichedApplications: UserApplicationData[] = await Promise.all(
          (applications || []).map(async (app) => {
            let companyName = "Unknown Company";

            if (app.petitions?.user_uuid) {
              const { data: ownerData } = await supabase
                .from("users")
                .select("name, email")
                .eq("uuid", app.petitions.user_uuid)
                .single();

              companyName =
                ownerData?.name || ownerData?.email || "Unknown Company";
            }

            return {
              id: app.id,
              jobTitle: app.petitions?.title || "Unknown Position",
              company: companyName,
              status: app.status || "pending",
              appliedAt: app.created_at || new Date().toISOString(),
              message: app.message || "",
            };
          })
        );

        setMyApplications(enrichedApplications);
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    },
    [supabase]
  );

  const fetchUserData = useCallback(async () => {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User not authenticated:", userError);
        setLoading(false);
        return;
      }

      // Fetch user's posted petitions
      await fetchUserPetitions(user.id);

      // Fetch user's applications
      await fetchUserApplications(user.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchUserPetitions, fetchUserApplications, supabase]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleReviewApplications = (job: PetitionData) => {
    setSelectedJob(job);
    setIsReviewModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "accepted":
        return <Badge className="bg-green-600">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-b border-border p-4">
        <h2 className="text-xl font-bold">My Jobs</h2>
        <p className="text-muted-foreground">
          Manage your requests and applications
        </p>
      </div>

      <Tabs defaultValue="posted" className="w-full">
        <TabsList className="grid min-w-xl  grid-cols-2 m-4  mx-auto">
          <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
          <TabsTrigger value="applied">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="posted" className="p-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="animate-pulse">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : myJobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  You haven&apos;t posted any petitions yet.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first petition to start receiving applications!
                </p>
              </CardContent>
            </Card>
          ) : (
            myJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.createdAt), {
                          addSuffix: true,
                          locale: enUS,
                        })}
                      </p>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {job.applicationsCount} applications
                      </span>
                    </div>
                    <Button
                      onClick={() => handleReviewApplications(job)}
                      className="bg-primary hover:bg-primary/80 cursor-pointer"
                      disabled={job.applicationsCount === 0}
                    >
                      Review Applications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="applied" className="p-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="animate-pulse space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : myApplications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  You haven&apos;t applied to any petitions yet.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Browse available petitions and apply to ones that interest
                  you!
                </p>
              </CardContent>
            </Card>
          ) : (
            myApplications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {application.jobTitle}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Company: {application.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Applied{" "}
                        {formatDistanceToNow(new Date(application.appliedAt), {
                          addSuffix: true,
                          locale: enUS,
                        })}
                      </p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {application.message.length > 100
                      ? `${application.message.substring(0, 100)}...`
                      : application.message}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {application.status === "pending" && (
                      <Button variant="outline" size="sm">
                        Edit Application
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {selectedJob && (
        <ApplicationReviewModal
          open={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
          job={selectedJob}
          onApplicationUpdate={fetchUserData}
        />
      )}
    </div>
  );
}
