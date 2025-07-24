import { PetitionDetails } from "../__componets/petition-details"

interface PetitionPageProps {
  params: {
    id: string
  }
}

export default function PetitionPage({ params }: PetitionPageProps) {
  return (
     <PetitionDetails petitionId={params.id} />
  )
}