"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, DollarSign, MapPin, Clock, Users } from "lucide-react"
import { toast } from "sonner"

interface ApplicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  petition: {
    id: string
    title: string
    description: string
    category: string
    petitionType: string
    budget: string
    location: string
    tags: string[]
    duration: string
    participants: string
    postedBy: string
    requirements: string
  }
}

export function ApplicationModal({ open, onOpenChange, petition }: ApplicationModalProps) {
  const [applicationData, setApplicationData] = useState({
    message: "",
    expectedSalary: "",
    availability: "",
    portfolio: "",
    cv: null as File | null,
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setApplicationData((prev) => ({ ...prev, cv: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Application submitted:", {
      petitionId: petition.id,
      ...applicationData,
    })

    toast(
      <>
        <strong>Application submitted!</strong>
        <div>Your application for &quot;{petition.title}&quot; has been sent successfully.</div>
      </>
    )

    // Reset form and close modal
    setApplicationData({
      message: "",
      expectedSalary: "",
      availability: "",
      portfolio: "",
      cv: null,
    })

    onOpenChange(false)
  }

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
              <p className="text-sm text-muted-foreground">{petition.requirements}</p>
            </div>
          )}
        </div>

        {/* Rest of the form remains the same */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="message">Why are you the ideal person for this petition? *</Label>
            <Textarea
              id="message"
              value={applicationData.message}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, message: e.target.value }))}
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
                onChange={(e) => setApplicationData((prev) => ({ ...prev, expectedSalary: e.target.value }))}
                placeholder="E.g.: $800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={applicationData.availability}
                onChange={(e) => setApplicationData((prev) => ({ ...prev, availability: e.target.value }))}
                placeholder="E.g.: Immediate, In 2 weeks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio/Links (optional)</Label>
            <Input
              id="portfolio"
              value={applicationData.portfolio}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, portfolio: e.target.value }))}
              placeholder="Links to your portfolio, GitHub, LinkedIn, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv">Curriculum Vitae *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                required
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
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="font-medium">Upload Curriculum</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC or DOCX (max. 10MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
