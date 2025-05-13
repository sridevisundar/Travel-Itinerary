"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Loader2 } from "lucide-react"

interface DayItinerary {
  day: number
  date: string
  morning: { location: string }
  lunch: { location: string }
  afternoon: { location: string }
  dinner: { location: string }
  evening: { location: string }
}

interface MapViewProps {
  destination: string
  itinerary: DayItinerary[]
  onError?: () => void
}

// Define the window.L type for TypeScript
declare global {
  interface Window {
    L: any
  }
}

export function MapView({ destination, itinerary, onError }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const linkRef = useRef<HTMLLinkElement | null>(null)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined" || !mapRef.current) return

    let mapInstance: any = null

    const loadLeaflet = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Check if Leaflet is already loaded
        if (window.L) {
          await initMap()
          return
        }

        // Load Leaflet CSS if not already loaded
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          link.crossOrigin = ""
          document.head.appendChild(link)
          linkRef.current = link
        }

        // Load Leaflet JS if not already loaded
        if (!document.querySelector('script[src*="leaflet.js"]')) {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          script.crossOrigin = ""

          script.onload = async () => {
            await initMap()
          }

          script.onerror = () => {
            const errorMsg = "Failed to load map library. Please try again later."
            setError(errorMsg)
            setIsLoading(false)
            if (onError) onError()
          }

          document.body.appendChild(script)
          scriptRef.current = script
        }
      } catch (err) {
        console.error("Error loading Leaflet:", err)
        const errorMsg = "Failed to load map. Please try again later."
        setError(errorMsg)
        setIsLoading(false)
        if (onError) onError()
      }
    }

    const initMap = async () => {
      if (!mapRef.current || !window.L) return

      try {
        // Clear previous map
        if (mapInstance) {
          mapInstance.remove()
        }
        mapRef.current.innerHTML = ""

        // Default coordinates for India if geocoding fails
        let lat = 20.5937
        let lon = 78.9629
        let zoomLevel = 5

        try {
          // Geocode the destination using Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}, India`,
            {
              headers: {
                "Accept-Language": "en-US,en;q=0.9",
                "User-Agent": "TravelPlannerApp/1.0", // Identify your application as per Nominatim usage policy
              },
            },
          )

          if (!response.ok) {
            throw new Error(`Geocoding failed with status: ${response.status}`)
          }

          const data = await response.json()

          if (data && data.length > 0) {
            lat = Number.parseFloat(data[0].lat)
            lon = Number.parseFloat(data[0].lon)
            zoomLevel = 12
          }
        } catch (geocodeError) {
          console.error("Error geocoding destination:", geocodeError)
          // Continue with default coordinates
        }

        // Initialize map with coordinates (either from geocoding or defaults)
        mapInstance = window.L.map(mapRef.current).setView([lat, lon], zoomLevel)

        // Add tile layer - using OpenStreetMap's free tile server
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstance)

        // Add marker for the destination
        if (zoomLevel > 5) {
          window.L.marker([lat, lon]).addTo(mapInstance).bindPopup(`<b>${destination}</b>`).openPopup()
        }

        // Try to add markers for day 1 locations if we have a valid destination
        if (zoomLevel > 5 && itinerary && itinerary.length > 0) {
          const day1 = itinerary[0]
          const locations = [
            { name: day1.morning.location, type: "Morning" },
            { name: day1.lunch.location, type: "Lunch" },
            { name: day1.afternoon.location, type: "Afternoon" },
            { name: day1.dinner.location, type: "Dinner" },
            { name: day1.evening.location, type: "Evening" },
          ]

          // Add markers for each location (with delay to respect Nominatim usage policy)
          for (const [index, location] of locations.entries()) {
            try {
              // Add delay between requests to respect Nominatim usage policy
              await new Promise((resolve) => setTimeout(resolve, 1000 * index))

              const locResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.name)}, ${encodeURIComponent(destination)}, India`,
                {
                  headers: {
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "TravelPlannerApp/1.0",
                  },
                },
              )

              if (!locResponse.ok) {
                continue // Skip this location if geocoding fails
              }

              const locData = await locResponse.json()

              if (locData && locData.length > 0) {
                const locLat = Number.parseFloat(locData[0].lat)
                const locLon = Number.parseFloat(locData[0].lon)

                // Create a custom icon with different colors based on activity type
                const icon = window.L.divIcon({
                  html: `<div style="background-color: #9333ea; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
                  className: "custom-div-icon",
                  iconSize: [15, 15],
                  iconAnchor: [7, 7],
                })

                window.L.marker([locLat, locLon], { icon })
                  .addTo(mapInstance)
                  .bindPopup(`<b>${location.type}:</b> ${location.name}`)
              }
            } catch (error) {
              console.error("Error geocoding location:", location, error)
              // Continue with next location
            }
          }
        }

        setIsLoading(false)
      } catch (mapError) {
        console.error("Error initializing map:", mapError)
        const errorMsg = "Failed to initialize map. Please try again later."
        setError(errorMsg)
        setIsLoading(false)
        if (onError) onError()
      }
    }

    loadLeaflet()

    // Cleanup function
    return () => {
      // Remove the map instance if it exists
      if (mapInstance) {
        mapInstance.remove()
      }

      // Only remove the script if we added it and it still exists in the document
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current)
        scriptRef.current = null
      }

      // Only remove the link if we added it and it still exists in the document
      if (linkRef.current && document.head.contains(linkRef.current)) {
        document.head.removeChild(linkRef.current)
        linkRef.current = null
      }
    }
  }, [destination, itinerary, onError])

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-400" />
          Map View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-[400px] rounded-lg bg-gray-700/30 relative" aria-label={`Map of ${destination}`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-purple-400 animate-spin mb-2" />
                <p className="text-white text-sm">Loading map...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="text-center p-4">
                <p className="text-red-400 mb-2">{error}</p>
                <p className="text-gray-300 text-sm">Showing locations for {destination}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-400 text-center">
          Powered by OpenStreetMap | © OpenStreetMap contributors
        </div>
      </CardContent>
    </Card>
  )
}
