import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, MapPin, DollarSign } from "lucide-react"

interface Accommodation {
  name: string
  description: string
  priceRange: string
  location: string
}

interface AccommodationOptionsProps {
  accommodation: Accommodation[]
}

export function AccommodationOptions({ accommodation }: AccommodationOptionsProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Accommodation Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accommodation.map((option, index) => (
            <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Building className="h-5 w-5 text-purple-400" />
                <div className="font-medium text-white">{option.name}</div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{option.description}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-300">
                  <MapPin className="h-4 w-4 text-purple-300" />
                  {option.location}
                </div>
                <div className="flex items-center gap-1 font-medium text-purple-300">
                  <DollarSign className="h-4 w-4" />
                  {option.priceRange}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
