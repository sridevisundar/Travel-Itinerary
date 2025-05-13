"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPredefinedItinerary } from "@/app/actions/trip-planner"
import { useToast } from "@/hooks/use-toast"

export function DestinationSelector() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  async function handleSelectDestination(destination: string) {
    setIsLoading(destination)

    try {
      const result = await createPredefinedItinerary(destination)

      if (result.success && result.itineraryId) {
        toast({
          title: "Itinerary Created",
          description: `Your ${destination} itinerary is ready!`,
        })

        // Navigate to the itinerary page
        setTimeout(() => {
          router.push(`/itinerary/${result.itineraryId}`)
        }, 500)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create itinerary",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating predefined itinerary:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div>
      {/* Add your updated content here */}
    </div>
  )
}
