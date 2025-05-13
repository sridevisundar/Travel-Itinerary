"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Building, Star, MapPin, Wifi, Coffee, Utensils } from "lucide-react"
import { searchHotels } from "@/app/actions/hotels"

interface HotelOption {
  id: string
  name: string
  rating: number
  price: string
  location: string
  image: string
  amenities: string[]
}

export function HotelSearch() {
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<HotelOption[]>([])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const options = await searchHotels({
        destination,
        checkIn,
        checkOut,
        guests: Number.parseInt(guests),
      })

      setResults(options)
    } catch (error) {
      console.error("Error searching hotels:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
    ))
  }

  // Helper function to render amenity icon
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes("wifi")) {
      return <Wifi className="h-4 w-4" />
    } else if (lowerAmenity.includes("breakfast")) {
      return <Coffee className="h-4 w-4" />
    } else if (lowerAmenity.includes("restaurant")) {
      return <Utensils className="h-4 w-4" />
    } else {
      return null
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Building className="h-5 w-5 text-purple-400" />
          Find Hotels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="destination" className="block text-sm text-gray-300 mb-1">
              Destination
            </label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or hotel name"
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="checkIn" className="block text-sm text-gray-300 mb-1">
                Check-in
              </label>
              <div className="relative">
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm text-gray-300 mb-1">
                Check-out
              </label>
              <div className="relative">
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm text-gray-300 mb-1">
              Guests
            </label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="Number of guests" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">
                  <Search className="h-4 w-4" />
                </span>
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Hotels
              </span>
            )}
          </Button>
        </form>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-white font-medium">Search Results</h3>
            {results.map((hotel) => (
              <div key={hotel.id} className="bg-gray-700/30 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">{hotel.name}</h4>
                      <div className="flex items-center gap-1 mt-1">{renderStars(hotel.rating)}</div>
                    </div>
                    <div className="text-lg font-bold text-white">{hotel.price}</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-300 mb-3">
                    <MapPin className="h-4 w-4 text-purple-300" />
                    {hotel.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 text-gray-300"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
