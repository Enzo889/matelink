"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  DollarSign,
  Clock,
  Users,
  Calendar,
  Star,
  MessageCircle,
  Share2,
  Heart,
  Flag,
  ArrowLeft,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ApplicationModal } from "./aplication-modal"

interface PetitionDetailsProps {
  petitionId: string
}

// Mock data - in a real app this would come from an API
const mockPetition = {
  id: "1",
  title: "Looking for an English teacher for beginners",
  description: `Hi! I'm María and I'm looking for an English teacher to help me learn from scratch.

I've never formally studied English and I'm a bit embarrassed, but I really want to learn to travel and improve my job opportunities.

**What I'm looking for:**
- 1 hour online classes
- 2 times a week (preferably Tuesday and Thursday evenings)
- Patient teacher who understands I'm a real beginner
- Practical methodology, not just grammar
- Help with pronunciation

**My availability:**
- Tuesdays and Thursdays from 6:00 p.m. to 9:00 p.m.
- Saturday mornings (as an alternative)

**My current level:**
- I know some basic words
- I understand very little when I listen
- I've never had a conversation in English

I'm very motivated to learn and willing to do homework and practice between classes. I'm looking for someone who really enjoys teaching and has experience with beginner adult students.`,
  category: "Languages",
  petitionType: "Busco Servicio",
  budget: "$15/hour",
  location: "Online",
  tags: ["English", "Beginner", "Online", "Conversation", "Adults"],
  duration: "3 months initially",
  participants: "1 person",
  postedBy: "María González",
  postedAt: "2025-07-23T10:30:00Z",
  applicationsCount: 8,
  requirements: "Teacher with experience teaching beginners, patience and afternoon availability.",
  userProfile: {
    rating: 4.8,
    reviewsCount: 23,
    joinedDate: "2024-03-15",
    completedPetitions: 12,
    bio: "I love learning new things and meeting people. I'm very responsible and punctual.",
    interests: ["Languages", "Travel", "Technology", "Reading"],
  },
  applications: [
    {
      id: "1",
      applicantName: "John Smith",
      rating: 4.9,
      reviewsCount: 45,
      experience: "5 years teaching English",
      message:
        "Hi María! I'm a native English teacher with 5 years of experience teaching beginner adults. I specialize in creating a comfortable and pressure-free environment so my students feel confident learning. I'm available exactly at the times you mention.",
      price: "$15/hour",
      appliedAt: "2025-07-23T11:00:00Z",
    },
    {
      id: "2",
      applicantName: "Sarah Johnson",
      rating: 4.7,
      reviewsCount: 32,
      experience: "3 years teaching online",
      message:
        "Hi! I'd love to help you learn English. I'm a TEFL certified teacher and have a lot of experience with beginners. My methodology focuses on practical conversation from day one, but in a very gradual and comfortable way.",
      price: "$12/hour",
      appliedAt: "2025-07-23T12:30:00Z",
    },
  ],
  similarPetitions: [
    {
      id: "2",
      title: "Conversational English classes",
      category: "Languages",
      budget: "$18/hour",
      applicationsCount: 5,
    },
    {
      id: "3",
      title: "Spanish-English language exchange",
      category: "Languages",
      budget: "Free",
      applicationsCount: 8,
    },
  ],
}

export function PetitionDetails({ petitionId }: PetitionDetailsProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()

  const timeAgo = formatDistanceToNow(new Date(mockPetition.postedAt), {
    addSuffix: true,
    locale: enUS,
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getPetitionTypeColor = (type: string) => {
    switch (type) {
      case "Busco Servicio":
        return "bg-blue-600"
      case "Ofrezco Servicio":
        return "bg-green-600"
      case "Intercambio":
        return "bg-purple-600"
      case "Colaboración":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with back button */}
      <div className="border-b border-border p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1  gap-6 p-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Petition header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-amber-600 text-white">
                      {getInitials(mockPetition.postedBy)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{mockPetition.postedBy}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mockPetition.userProfile.rating}</span>
                        <span>({mockPetition.userProfile.reviewsCount} reviews)</span>
                      </div>
                      <span>•</span>
                      <span>{timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">{mockPetition.category}</Badge>
                <Badge className={`${getPetitionTypeColor(mockPetition.petitionType)} text-white`}>
                  {mockPetition.petitionType}
                </Badge>
              </div>

              <h1 className="text-2xl font-bold mb-4">{mockPetition.title}</h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{mockPetition.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockPetition.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{mockPetition.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{mockPetition.participants}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Descripción detallada */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {mockPetition.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.startsWith("**") && paragraph.endsWith("**") ? (
                      <strong className="text-foreground">{paragraph.slice(2, -2)}</strong>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Etiquetas y requisitos */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockPetition.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {mockPetition.requirements && (
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <p className="text-muted-foreground">{mockPetition.requirements}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs con aplicaciones y comentarios */}
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="applications">Applicants ({mockPetition.applicationsCount})</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-4">
              {mockPetition.applications.map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-green-600 text-white">
                          {getInitials(application.applicantName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{application.applicantName}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{application.rating}</span>
                                <span>({application.reviewsCount})</span>
                              </div>
                              <span>•</span>
                              <span>{application.experience}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{application.price}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{application.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-center">
                    No comments yet. Be the first to comment!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Main action */}
          <Card>
            <CardContent className="p-4">
              <Button
                onClick={() => setIsApplicationModalOpen(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white mb-3"
                size="lg"
              >
                {mockPetition.petitionType === "Busco Servicio" ? "Offer Service" : "I'm Interested"}
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* User profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About {mockPetition.postedBy}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {new Date(mockPetition.userProfile.joinedDate).toLocaleDateString("en-US")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>
                  {mockPetition.userProfile.rating} ({mockPetition.userProfile.reviewsCount} reviews)
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{mockPetition.userProfile.completedPetitions}</span> completed petitions
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">{mockPetition.userProfile.bio}</p>
              <div>
                <p className="text-sm font-medium mb-2">Interests:</p>
                <div className="flex flex-wrap gap-1">
                  {mockPetition.userProfile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar petitions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Petitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPetition.similarPetitions.map((similar) => (
                <div key={similar.id} className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">{similar.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{similar.category}</span>
                    <span>{similar.budget}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{similar.applicationsCount} interested</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application modal */}
      <ApplicationModal
        open={isApplicationModalOpen}
        onOpenChange={setIsApplicationModalOpen}
        petition={mockPetition}
      />
    </div>
  )
}
