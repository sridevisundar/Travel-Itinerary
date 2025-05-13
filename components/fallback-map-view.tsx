import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface DayItinerary {
  day: number
  date: string
  morning: { location: string }
  lunch: { location: string }
  afternoon: { location: string }
  dinner: { location: string }
  evening: { location: string }
}

interface FallbackMapViewProps {
  destination: string
  itinerary: DayItinerary[]
}

export function FallbackMapView({ destination, itinerary }: FallbackMapViewProps) {
  // Get day 1 locations
  const day1 = itinerary && itinerary.length > 0 ? itinerary[0] : null

  const locations = day1
    ? [
        { name: day1.morning.location, type: "Morning" },
        { name: day1.lunch.location, type: "Lunch" },
        { name: day1.afternoon.location, type: "Afternoon" },
        { name: day1.dinner.location, type: "Dinner" },
        { name: day1.evening.location, type: "Evening" },
      ]
    : []

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-400" />
          Locations in {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-700/30 p-4 rounded-lg">
          <div className="text-white font-medium mb-3">Day 1 Locations</div>

          {locations.length > 0 ? (
            <div className="space-y-2">
              {locations.map((location, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-300">
                  <div className="mt-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  </div>
                  <div>
                    <div className="text-purple-300 text-sm">{location.type}</div>
                    <div>{location.name}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-4">No location data available</div>
          )}

          <div className="mt-4 text-xs text-gray-400">
            <p>Interactive map is currently unavailable.</p>
            <p>For directions, please use Google Maps or a similar service.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
