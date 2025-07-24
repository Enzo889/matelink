"use client"

import { useState } from "react"
import { ApplicationModal } from "./aplication-modal"
import { PetitionCard } from "./petition-card"

// Mock data for petitions
const mockPetitions = [
  {
    id: "1",
    title: "Looking for an English teacher for beginners",
    description:
      "I need an English teacher to help me learn from scratch. I prefer 1-hour online classes, twice a week. I'm a real beginner and need patience.",
    category: "Languages",
    petitionType: "Busco Servicio",
    budget: "$15/hour",
    location: "Online",
    tags: ["English", "Beginner", "Online", "Conversation"],
    duration: "3 months",
    participants: "1 person",
    postedBy: "María González",
    postedAt: "2025-07-23T10:30:00Z",
    applicationsCount: 8,
    requirements: "Teacher with experience teaching beginners, patience and afternoon availability.",
  },
  {
    id: "2",
    title: "I offer guitar lessons for children",
    description:
      "I'm a professional musician with 10 years of experience. I offer guitar lessons for children aged 6 to 12. Fun method adapted to each age.",
    category: "Music",
    petitionType: "Ofrezco Servicio",
    budget: "$20/hour",
    location: "Palermo, Buenos Aires",
    tags: ["Guitar", "Children", "Music", "In-person"],
    duration: "Regular classes",
    participants: "Individual or group",
    postedBy: "Carlos Ruiz",
    postedAt: "2025-07-23T08:15:00Z",
    applicationsCount: 5,
    requirements: "Children must bring their own guitar. Available Saturday mornings.",
  },
  {
    id: "3",
    title: "Need help with computer repair",
    description:
      "My laptop won't turn on and I need someone to check it. I think it could be the power supply or motherboard. Looking for a reliable technician.",
    category: "Technology",
    petitionType: "Busco Servicio",
    budget: "$50-100",
    location: "Villa Crespo, Buenos Aires",
    tags: ["Repair", "Computer", "Technician", "Urgent"],
    duration: "1-2 days",
    participants: "1 technician",
    postedBy: "Ana Martínez",
    postedAt: "2025-07-22T16:45:00Z",
    applicationsCount: 12,
    requirements: "Technician with experience in laptop repair, able to come to home.",
  },
  {
    id: "4",
    title: "Exchange: Spanish classes for French classes",
    description:
      "I'm a native Spanish speaker and want to learn French. Looking for a native French speaker who wants to learn Spanish. We can do a language exchange.",
    category: "Languages",
    petitionType: "Intercambio",
    budget: "Free (exchange)",
    location: "Online or Recoleta",
    tags: ["Spanish", "French", "Exchange", "Native"],
    duration: "Indefinite",
    participants: "1 person",
    postedBy: "Sofía López",
    postedAt: "2025-07-22T14:20:00Z",
    applicationsCount: 3,
    requirements: "Native French speaker, intermediate Spanish level preferred.",
  },
]

export function PetitionFeed() {
  const [selectedPetition, setSelectedPetition] = useState<(typeof mockPetitions)[0] | null>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  const handleApplyClick = (petition: (typeof mockPetitions)[0]) => {
    setSelectedPetition(petition)
    setIsApplicationModalOpen(true)
  }

  return (
    <div className="max-w-2xl mx-auto">

      <div className="divide-y divide-border space-y-6">
        {mockPetitions.map((petition) => (
          <PetitionCard key={petition.id} petition={petition} onApply={() => handleApplyClick(petition)} />
        ))}
      </div>

      {selectedPetition && (
        <ApplicationModal
          open={isApplicationModalOpen}
          onOpenChange={setIsApplicationModalOpen}
          petition={selectedPetition}
        />
      )}
    </div>
  )
}
