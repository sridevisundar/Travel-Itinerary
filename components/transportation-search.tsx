"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Train, Bus, Calendar, Search } from "lucide-react"
import { searchTransportation } from "@/app/actions/transportation"

interface TransportationOption {
  id: string
  type: string
  provider: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: string
  stops?: number
}

export function TransportationSearch() {
  const [transportType, setTransportType] = useState("flights")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TransportationOption[]>([])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const options = await searchTransportation({
        type: transportType,
        origin,
        destination,
        departureDate,
      })

      setResults(options)
    } catch (error) {
      console.error("Error searching transportation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = () => {
    switch (transportType) {
      case "flights":
        return <Plane className="h-5 w-5" />
      case "trains":
        return <Train className="h-5 w-5" />
      case "buses":
        return <Bus className="h-5 w-5" />
      default:
        return <Plane className="h-5 w-5" />
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Find Transportation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flights" onValueChange={setTransportType}>
          <TabsList className="bg-gray-700/50 mb-4">
            <TabsTrigger value="flights" className="flex items-center gap-1">
              <Plane className="h-4 w-4" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="trains" className="flex items-center gap-1">
              <Train className="h-4 w-4" />
              Trains
            </TabsTrigger>
            <TabsTrigger value="buses" className="flex items-center gap-1">
              <Bus className="h-4 w-4" />
              Buses
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="origin" className="block text-sm text-gray-300 mb-1">
                  From
                </label>
                <Input
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder={transportType === "flights" ? "e.g. Delhi" : "e.g. New Delhi Railway Station"}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm text-gray-300 mb-1">
                  To
                </label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={transportType === "flights" ? "e.g. Mumbai" : "e.g. Mumbai Central"}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="departureDate" className="block text-sm text-gray-300 mb-1">
                Departure Date
              </label>
              <div className="relative">
                <Input
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">{getIcon()}</span>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search {transportType.charAt(0).toUpperCase() + transportType.slice(1)}
                </span>
              )}
            </Button>
          </form>

          {results.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-white font-medium">Search Results</h3>
              {results.map((option) => (
                <div key={option.id} className="bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-purple-400">{getIcon()}</div>
                      <div>
                        <div className="font-medium text-white">{option.provider}</div>
                        <div className="text-sm text-gray-300">
                          {option.type === "flight" && option.stops !== undefined
                            ? `${option.stops === 0 ? "Direct" : `${option.stops} stop${option.stops > 1 ? "s" : ""}`}`
                            : option.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white">{option.price}</div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-300">
                      <div>{option.departureTime}</div>
                      <div>{origin}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-purple-300 font-medium">{option.duration}</div>
                      <div className="border-t border-dashed border-gray-600 w-16 mx-auto my-1"></div>
                    </div>

                    <div className="text-gray-300 text-right">
                      <div>{option.arrivalTime}</div>
                      <div>{destination}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Button
                      variant="outline"
                      className="w-full border-purple-600 text-purple-300 hover:bg-purple-900/20"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
