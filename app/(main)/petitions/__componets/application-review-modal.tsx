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
import { es } from "date-fns/locale"
import { toast } from "sonner"

interface ApplicationReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  job: {
    id: string
    title: string
    applications: Array<{
      id: string
      applicantName: string
      message: string
      expectedSalary: string
      availability: string
      portfolio: string
      appliedAt: string
      status: string
    }>
  }
}

export function ApplicationReviewModal({ open, onOpenChange, job }: ApplicationReviewModalProps) {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [responseMessage, setResponseMessage] = useState("")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAcceptApplication = (applicationId: string, applicantName: string) => {
    console.log("Accepting application:", applicationId)

    toast.success(
      <>
        <strong>Application accepted!</strong>
        <div>You have accepted {applicantName}&apos;s application. They will be notified.</div>
      </>
    )

    setSelectedApplication(null)
    setResponseMessage("")
  }

  const handleRejectApplication = (applicationId: string, applicantName: string) => {
    console.log("Rejecting application:", applicationId)

    toast.warning(
      <>
        <strong>Application rejected</strong>
        <div>You have rejected {applicantName}&apos;s application.</div>
      </>
    )

    setSelectedApplication(null)
    setResponseMessage("")
  }

  const handleSendMessage = (applicationId: string, applicantName: string) => {
    if (!responseMessage.trim()) return

    console.log("Sending message:", { applicationId, message: responseMessage })

    toast(
      <>
        <strong>Message sent</strong>
        <div>Your message has been sent to {applicantName}.</div>
      </>
    )

    setResponseMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Postulaciones para: {job.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1  gap-6">
          {/* Lista de postulaciones */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Postulaciones ({job.applications.length})</h3>

            {job.applications.map((application) => (
              <Card
                key={application.id}
                className={`cursor-pointer transition-colors ${
                  selectedApplication === application.id ? "ring-2 ring-amber-600" : "hover:bg-accent/50"
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
                        <p className="font-semibold">{application.applicantName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(application.appliedAt), {
                            addSuffix: true,
                            locale: es,
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant={application.status === "pending" ? "secondary" : "outline"}>
                      {application.status === "pending" ? "Pendiente" : application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{application.message}</p>
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
                const application = job.applications.find((app) => app.id === selectedApplication)
                if (!application) return null

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Detalles de la Postulación</h3>
                      <Badge variant={application.status === "pending" ? "secondary" : "outline"}>
                        {application.status === "pending" ? "Pendiente" : application.status}
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
                            <p className="font-semibold text-lg">{application.applicantName}</p>
                            <p className="text-sm text-muted-foreground">
                              Postulado{" "}
                              {formatDistanceToNow(new Date(application.appliedAt), {
                                addSuffix: true,
                                locale: es,
                              })}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="font-medium">Mensaje de postulación:</Label>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{application.message}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-medium">Salario esperado:</Label>
                            <p className="text-sm text-muted-foreground">{application.expectedSalary}</p>
                          </div>
                          <div>
                            <Label className="font-medium">Disponibilidad:</Label>
                            <p className="text-sm text-muted-foreground">{application.availability}</p>
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
                          <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver CV
                          </Button>
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
                            onClick={() => handleAcceptApplication(application.id, application.applicantName)}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1 cursor-pointer"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aceptar
                          </Button>
                          <Button
                            onClick={() => handleRejectApplication(application.id, application.applicantName)}
                            variant="destructive"
                            className="flex-1 cursor-pointer"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Rechazar
                          </Button>
                        </div>

                        {responseMessage.trim() && (
                          <Button
                            onClick={() => handleSendMessage(application.id, application.applicantName)}
                            variant="outline"
                            className="w-full"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Enviar Mensaje
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )
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
  )
}
