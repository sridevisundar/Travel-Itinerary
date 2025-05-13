import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Train, Bus, Car } from "lucide-react"

interface TransportOption {
  type: string
  details: string
  estimatedCost: string
}

interface TransportationProps {
  transportation: {
    toDestination: TransportOption[]
    localOptions: TransportOption[]
  }
}

export function TransportationOptions({ transportation }: TransportationProps) {
  // Helper function to get the appropriate icon
  const getTransportIcon = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes("flight") || lowerType.includes("plane") || lowerType.includes("air")) {
      return <Plane className="h-5 w-5" />
    } else if (lowerType.includes("train")) {
      return <Train className="h-5 w-5" />
    } else if (lowerType.includes("bus")) {
      return <Bus className="h-5 w-5" />
    } else {
      return <Car className="h-5 w-5" />
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Transportation Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-purple-400 mb-2">To Destination</h3>
          <div className="space-y-3">
            {transportation.toDestination.map((option, index) => (
              <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-purple-400">{getTransportIcon(option.type)}</div>
                  <div className="font-medium text-white">{option.type}</div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{option.details}</p>
                <div className="text-sm font-medium text-purple-300">Est. Cost: {option.estimatedCost}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-purple-400 mb-2">Local Transportation</h3>
          <div className="space-y-3">
            {transportation.localOptions.map((option, index) => (
              <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-purple-400">{getTransportIcon(option.type)}</div>
                  <div className="font-medium text-white">{option.type}</div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{option.details}</p>
                <div className="text-sm font-medium text-purple-300">Est. Cost: {option.estimatedCost}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
