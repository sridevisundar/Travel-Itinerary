import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Users, Star } from "lucide-react"
import Image from "next/image"

interface TripSummary {
  destination: string
  duration: number
  startDate: string
  endDate: string
  budget: string
  travelGroup: string
}

interface Highlight {
  name: string
  description: string
  type: string
}

interface DestinationImage {
  url: string
  alt: string
}

interface ItineraryDetailsProps {
  tripSummary: TripSummary
  highlights: Highlight[]
  estimatedTotalCost: string
  destinationImages?: DestinationImage[]
}

export function ItineraryDetails({
  tripSummary,
  highlights,
  estimatedTotalCost,
  destinationImages = [],
}: ItineraryDetailsProps) {
  // Format dates
  const startDate = new Date(tripSummary.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const endDate = new Date(tripSummary.endDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-white">
          Your {tripSummary.duration}-Day Adventure in {tripSummary.destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {destinationImages && destinationImages.length > 0 && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <div className="relative h-64 w-full">
              <Image
                src={destinationImages[0].url || "/placeholder.svg"}
                alt={destinationImages[0].alt}
                fill
                className="object-cover"
              />
            </div>
            {destinationImages.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {destinationImages.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-300">
            <CalendarDays className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm">Travel Dates</div>
              <div className="font-medium">
                {startDate} to {endDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <DollarSign className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm">Budget Level</div>
              <div className="font-medium capitalize">{tripSummary.budget}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Users className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm">Traveling With</div>
              <div className="font-medium capitalize">
                {tripSummary.travelGroup === "solo"
                  ? "Just Me"
                  : tripSummary.travelGroup === "couple"
                    ? "Couple"
                    : tripSummary.travelGroup}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-400" />
            Trip Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-white">{highlight.name}</h4>
                  <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-700">
                    {highlight.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="text-white">Estimated Total Cost</div>
            <div className="text-xl font-bold text-white">{estimatedTotalCost}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
