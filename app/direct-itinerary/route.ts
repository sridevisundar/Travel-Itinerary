import { type NextRequest, NextResponse } from "next/server"
import { createDirectItinerary } from "@/app/actions/trip-planner"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const departureFrom = searchParams.get("from") || "Delhi"
    const destination = searchParams.get("to") || "Goa"
    const startDate = searchParams.get("start") || new Date().toISOString().split("T")[0]
    const endDate =
      searchParams.get("end") || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const interests = searchParams.get("interests") || "Beaches, local cuisine, and cultural experiences"
    const budget = searchParams.get("budget") || "moderate"
    const travelGroup = searchParams.get("group") || "couple"

    // Create a direct itinerary
    const result = await createDirectItinerary(
      departureFrom,
      destination,
      startDate,
      endDate,
      interests,
      budget,
      travelGroup,
    )

    if (result.success && result.itineraryId) {
      // Redirect to the itinerary page
      return NextResponse.redirect(new URL(`/itinerary/${result.itineraryId}`, request.url))
    }

    // Return error
    return NextResponse.json({ error: result.error || "Failed to create itinerary" }, { status: 500 })
  } catch (error) {
    console.error("Error in direct itinerary route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
