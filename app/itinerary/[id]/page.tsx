import { notFound, redirect } from "next/navigation"
import { getItinerary, createDirectItinerary } from "@/app/actions/trip-planner"
import { ItineraryDetails } from "@/components/itinerary-details"
import { TransportationOptions } from "@/components/transportation-options"
import { AccommodationOptions } from "@/components/accommodation-options"
import { DailyItinerary } from "@/components/daily-itinerary"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"

export default async function ItineraryPage({ params }: { params: { id: string } }) {
  console.log(`Rendering itinerary page for ID: ${params.id}`)

  // Try to get the itinerary
  const itinerary = await getItinerary(params.id)

  // If not found, try to create a fallback itinerary
  if (!itinerary) {
    console.log(`Itinerary not found for ID: ${params.id}, attempting to create fallback`)

    // Check if we have a last itinerary ID in cookies
    const lastId = cookies().get("lastItineraryId")?.value

    if (lastId && lastId === params.id) {
      console.log(`ID ${params.id} matches last created itinerary ID from cookie, creating fallback`)

      // Create a fallback itinerary with default values
      const result = await createDirectItinerary(
        "Delhi", // default departure
        "Goa", // default destination
        new Date().toISOString().split("T")[0], // today
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // a week from today
        "Beaches, local cuisine, and cultural experiences", // default interests
        "moderate", // default budget
        "couple", // default travel group
      )

      if (result.success && result.itineraryId) {
        console.log(`Created fallback itinerary with ID: ${result.itineraryId}`)
        // Redirect to the new itinerary
        redirect(`/itinerary/${result.itineraryId}`)
      }
    }

    console.error(`Failed to create fallback itinerary for ID: ${params.id}`)
    notFound()
  }

  const { data, userInput } = itinerary
  console.log(`Successfully loaded itinerary for ${data.tripSummary.destination}`)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Planner
            </Button>
          </Link>

          <Logo />

          <div className="flex gap-2">
            <Button variant="outline" className="text-white border-gray-600">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" className="text-white border-gray-600">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <ItineraryDetails
            tripSummary={data.tripSummary}
            highlights={data.highlights}
            estimatedTotalCost={data.estimatedTotalCost}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransportationOptions transportation={data.transportation} />
            <AccommodationOptions accommodation={data.accommodation} />
          </div>

          <DailyItinerary itinerary={data.itinerary} />
        </div>
      </div>
    </main>
  )
}
