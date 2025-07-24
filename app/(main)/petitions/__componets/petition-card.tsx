"use client"

import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, DollarSign, Clock, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface PetitionCardProps {
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
    postedAt: string
    applicationsCount: number
    requirements: string
  }
  onApply: () => void
}

export function PetitionCard({ petition, onApply }: PetitionCardProps) {
  const timeAgo = formatDistanceToNow(new Date(petition.postedAt), {
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
    <Card className=" rounded-xl border-accent bg-background shadow-sm hover:shadow-md duration-200 cursor-pointer hover:bg-card/30 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-amber-600 text-white">{getInitials(petition.postedBy)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{petition.postedBy}</p>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{petition.category}</Badge>
            <Badge className={`${getPetitionTypeColor(petition.petitionType)} text-white`}>
              {petition.petitionType}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{petition.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{petition.description}</p>
        </div>

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
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{petition.applicationsCount} interested</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {petition.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <Link href={`/petitions/${petition.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <Button onClick={onApply} className="bg-primary hover:bg-primary/80 cursor-pointer">
            {petition.petitionType === "Busco Servicio" ? "Offer Service" : "I'm Interested"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
