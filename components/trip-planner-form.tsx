"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, MapPinIcon, HeartIcon, DollarSignIcon, UsersIcon, Plane, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { planTrip } from "@/app/actions/trip-planner"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function TripPlannerForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      // Validate dates
      const startDate = formData.get("startDate") as string
      const endDate = formData.get("endDate") as string

      if (!startDate || !endDate) {
        setError("Please select both start and end dates")
        setIsLoading(false)
        return
      }

      const start = new Date(startDate)
      const end = new Date(endDate)

      if (end < start) {
        setError("End date must be after start date")
        setIsLoading(false)
        return
      }

      // Call the server action
      console.log("Submitting form data to server action")
      const result = await planTrip(formData)
      console.log("Server action result:", result)

      if (result.success && result.itineraryId) {
        console.log(`Redirecting to itinerary: ${result.itineraryId}`)

        // Show a success toast
        toast({
          title: "Itinerary Created",
          description: "Your travel itinerary has been created successfully!",
        })

        // Store the itinerary ID in localStorage as a backup
        try {
          localStorage.setItem("lastItineraryId", result.itineraryId)
        } catch (e) {
          console.error("Failed to store itinerary ID in localStorage:", e)
        }

        // Use a slight delay before navigation to ensure the toast is shown
        // and the itinerary is saved
        setTimeout(() => {
          router.push(`/itinerary/${result.itineraryId}`)
        }, 500)
      } else {
        const errorMessage = result.error || "Failed to create itinerary. Please try again."
        console.error("Error from server action:", errorMessage)
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      const errorMessage = "Something went wrong. Please try again."
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <MapPinIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Locations</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="departureFrom" className="block text-sm text-gray-300 mb-1">
                  Departure From
                </label>
                <Input
                  id="departureFrom"
                  name="departureFrom"
                  placeholder="e.g. Delhi"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm text-gray-300 mb-1">
                  Destination
                </label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder="e.g. Goa"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <CalendarIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Travel Dates</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="startDate" className="block text-sm text-gray-300 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="bg-gray-700/50 border-gray-600 text-white"
                    required
                    disabled={isLoading}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm text-gray-300 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="bg-gray-700/50 border-gray-600 text-white"
                    required
                    disabled={isLoading}
                    defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <HeartIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Your Preferences</h2>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm text-gray-300 mb-1">
                Interests & Activities
              </label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="What do you enjoy? (e.g. temples, beaches, street food, trekking, historical sites...)"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <DollarSignIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Budget</h2>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm text-gray-300 mb-1">
                Price Range
              </label>
              <Select name="budget" defaultValue="moderate" disabled={isLoading}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="budget">Budget (₹1,000-3,000/day)</SelectItem>
                  <SelectItem value="moderate">Moderate (₹3,000-7,000/day)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹7,000+/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <UsersIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Travel Group</h2>
            </div>

            <div>
              <label htmlFor="travelGroup" className="block text-sm text-gray-300 mb-1">
                Traveling With
              </label>
              <Select name="travelGroup" defaultValue="couple" disabled={isLoading}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select group type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="solo">Just Me</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">
                    <Plane className="h-5 w-5 transform -rotate-45" />
                  </span>
                  Planning Your Trip...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plane className="h-5 w-5 transform -rotate-45" />
                  Plan My Perfect Trip
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
