"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, X, FileText, ExternalLink, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface ApplicationReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    applications: Array<{
      id: number;
      applicantName: string;
      message: string;
      expectedSalary: string | null;
      availability: string | null;
      portfolio: string | null;
      appliedAt: string | null;
      status: string;
      cv_url: string | null;
    }>;
  };
  onApplicationUpdate?: () => void;
}

export function ApplicationReviewModal({
  open,
  onOpenChange,
  job,
  onApplicationUpdate,
}: ApplicationReviewModalProps) {
  const [selectedApplication, setSelectedApplication] = useState<number | null>(
    null
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const supabase = createClient();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDownloadCV = async (cvPath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("applications")
        .download(cvPath);

      if (error) {
        console.error("Error downloading CV:", error);
        toast.error("Failed to download CV. Please try again.");
        return;
      }

      // Create a blob URL and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = cvPath.split("/").pop() || "cv.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CV:", error);
      toast.error("Failed to download CV. Please try again.");
    }
  };

  const handleAcceptApplication = async (
    applicationId: number,
    applicantName: string
  ) => {
    setIsProcessing(true);
    try {
      // Update application status to accepted
      const { error: updateError } = await supabase
        .from("applications")
        .update({ status: "accepted" })
        .eq("id", applicationId);

      if (updateError) {
        console.error("Error accepting application:", updateError);
        toast.error("Failed to accept application. Please try again.");
        return;
      }

      // Get applicant's user ID for notification
      const { data: applicationData } = await supabase
        .from("applications")
        .select("applicant_uuid")
        .eq("id", applicationId)
        .single();

      if (applicationData?.applicant_uuid) {
        // Get applicant's numeric user ID
        const { data: userData } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", applicationData.applicant_uuid)
          .single();

        if (userData?.id) {
          // Create notification for applicant
          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                user_id: userData.id,
                title: "Application Accepted!",
                message: `Your application for "${
                  job.title
                }" has been accepted! ${
                  responseMessage ? `Message: ${responseMessage}` : ""
                }`,
                type: "application_accepted",
                petition_id: job.id,
                is_read: false,
              },
            ]);

          if (notificationError) {
            console.error("Error creating notification:", notificationError);
          }
        }
      }

      toast.success(
        <>
          <strong>Application accepted!</strong>
          <div>
            You have accepted {applicantName}&apos;s application. They will be
            notified.
          </div>
        </>
      );

      setSelectedApplication(null);
      setResponseMessage("");

      // Refresh the applications list
      if (onApplicationUpdate) {
        onApplicationUpdate();
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectApplication = async (
    applicationId: number,
    applicantName: string
  ) => {
    setIsProcessing(true);
    try {
      // Update application status to rejected
      const { error: updateError } = await supabase
        .from("applications")
        .update({ status: "rejected" })
        .eq("id", applicationId);

      if (updateError) {
        console.error("Error rejecting application:", updateError);
        toast.error("Failed to reject application. Please try again.");
        return;
      }

      // Get applicant's user ID for notification
      const { data: applicationData } = await supabase
        .from("applications")
        .select("applicant_uuid")
        .eq("id", applicationId)
        .single();

      if (applicationData?.applicant_uuid) {
        // Get applicant's numeric user ID
        const { data: userData } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", applicationData.applicant_uuid)
          .single();

        if (userData?.id) {
          // Create notification for applicant
          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                user_id: userData.id,
                title: "Application Update",
                message: `Your application for "${
                  job.title
                }" was not selected this time. ${
                  responseMessage
                    ? `Message: ${responseMessage}`
                    : "Thank you for your interest!"
                }`,
                type: "application_rejected",
                petition_id: job.id,
                is_read: false,
              },
            ]);

          if (notificationError) {
            console.error("Error creating notification:", notificationError);
          }
        }
      }

      toast.warning(
        <>
          <strong>Application rejected</strong>
          <div>You have rejected {applicantName}&apos;s application.</div>
        </>
      );

      setSelectedApplication(null);
      setResponseMessage("");

      // Refresh the applications list
      if (onApplicationUpdate) {
        onApplicationUpdate();
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (
    applicationId: number,
    applicantName: string
  ) => {
    if (!responseMessage.trim()) return;

    setIsProcessing(true);
    try {
      // Get applicant's user ID for notification
      const { data: applicationData } = await supabase
        .from("applications")
        .select("applicant_uuid")
        .eq("id", applicationId)
        .single();

      if (applicationData?.applicant_uuid) {
        // Get applicant's numeric user ID
        const { data: userData } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", applicationData.applicant_uuid)
          .single();

        if (userData?.id) {
          // Create notification/message for applicant
          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                user_id: userData.id,
                title: `Message about "${job.title}"`,
                message: responseMessage,
                type: "message",
                petition_id: job.id,
                is_read: false,
              },
            ]);

          if (notificationError) {
            console.error("Error sending message:", notificationError);
            toast.error("Failed to send message. Please try again.");
            return;
          }
        }
      }

      toast.success(
        <>
          <strong>Message sent</strong>
          <div>Your message has been sent to {applicantName}.</div>
        </>
      );

      setResponseMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Postulaciones para: {job.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1  gap-6">
          {/* Lista de postulaciones */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Postulaciones ({job.applications.length})
            </h3>

            {job.applications.map((application) => (
              <Card
                key={application.id}
                className={`cursor-pointer transition-colors ${
                  selectedApplication === application.id
                    ? "ring-2 ring-amber-600"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedApplication(application.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-amber-600 text-white">
                          {getInitials(application.applicantName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {application.applicantName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(application.appliedAt),
                            {
                              addSuffix: true,
                              locale: enUS,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        application.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {application.status === "pending"
                        ? "Pendiente"
                        : application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {application.message}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Salario: {application.expectedSalary}</span>
                    <span>Disponibilidad: {application.availability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalles de la postulación seleccionada */}
          <div className="space-y-4">
            {selectedApplication ? (
              (() => {
                const application = job.applications.find(
                  (app) => app.id === selectedApplication
                );
                if (!application) return null;

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        Detalles de la Postulación
                      </h3>
                      <Badge
                        variant={
                          application.status === "pending"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {application.status === "pending"
                          ? "Pendiente"
                          : application.status}
                      </Badge>
                    </div>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-amber-600 text-white">
                              {getInitials(application.applicantName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">
                              {application.applicantName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Postulado{" "}
                              {formatDistanceToNow(
                                new Date(application.appliedAt),
                                {
                                  addSuffix: true,
                                  locale: enUS,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="font-medium">
                            Mensaje de postulación:
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {application.message}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-medium">
                              Salario esperado:
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {application.expectedSalary}
                            </p>
                          </div>
                          <div>
                            <Label className="font-medium">
                              Disponibilidad:
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {application.availability}
                            </p>
                          </div>
                        </div>

                        {application.portfolio && (
                          <div>
                            <Label className="font-medium">Portfolio:</Label>
                            <a
                              href={application.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-amber-600 hover:underline flex items-center gap-1 mt-1"
                            >
                              {application.portfolio}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}

                        <div>
                          <Label className="font-medium">Curriculum:</Label>
                          {application.cv_url ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-1 bg-transparent"
                              onClick={() =>
                                handleDownloadCV(application.cv_url!)
                              }
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View CV
                            </Button>
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">
                              No CV uploaded
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Responder al candidato */}
                    <Card>
                      <CardHeader>
                        <h4 className="font-medium">Responder al candidato</h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="response">Mensaje (opcional):</Label>
                          <Textarea
                            id="response"
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            placeholder="Escribe un mensaje para el candidato..."
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              handleAcceptApplication(
                                application.id,
                                application.applicantName
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white flex-1 cursor-pointer"
                            disabled={
                              isProcessing || application.status !== "pending"
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isProcessing ? "Processing..." : "Aceptar"}
                          </Button>
                          <Button
                            onClick={() =>
                              handleRejectApplication(
                                application.id,
                                application.applicantName
                              )
                            }
                            variant="destructive"
                            className="flex-1 cursor-pointer"
                            disabled={
                              isProcessing || application.status !== "pending"
                            }
                          >
                            <X className="h-4 w-4 mr-2" />
                            {isProcessing ? "Processing..." : "Rechazar"}
                          </Button>
                        </div>

                        {responseMessage.trim() && (
                          <Button
                            onClick={() =>
                              handleSendMessage(
                                application.id,
                                application.applicantName
                              )
                            }
                            variant="outline"
                            className="w-full"
                            disabled={isProcessing}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {isProcessing ? "Sending..." : "Enviar Mensaje"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </>
                );
              })()
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Selecciona una postulación para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
