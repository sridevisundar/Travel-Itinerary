"use server"

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { v4 as uuidv4 } from "uuid"
import { getDestinationImages } from "./destination-images"
import fs from "fs"
import path from "path"
import { cookies } from "next/headers"
import { predefinedItineraries } from "@/app/data/predefined-itineraries"

// Use file-based storage for development
// In production, you would use a database
const STORAGE_DIR = path.join(process.cwd(), ".itineraries")

// Ensure storage directory exists
try {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true })
    console.log(`Created storage directory: ${STORAGE_DIR}`)
  }
} catch (error) {
  console.error("Failed to create storage directory:", error)
}

// Function to extract JSON from text response
function extractJsonFromText(text: string) {
  try {
    // First try direct parsing
    return JSON.parse(text)
  } catch (error) {
    // If direct parsing fails, try to find JSON within the text
    try {
      // Look for text that might be enclosed in ```json ... ``` or similar
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1])
      }

      // Look for text that starts with { and ends with }
      const jsonObjectMatch = text.match(/\{[\s\S]*\}/)
      if (jsonObjectMatch) {
        return JSON.parse(jsonObjectMatch[0])
      }

      throw new Error("No valid JSON found in response")
    } catch (innerError) {
      console.error("Failed to extract JSON:", innerError)
      throw new Error("Failed to parse AI response as JSON")
    }
  }
}

// Create a detailed fallback itinerary
function createFallbackItinerary(
  departureFrom: string,
  destination: string,
  startDate: string,
  endDate: string,
  interests: string,
  budget: string,
  travelGroup: string,
  tripDays: number,
) {
  // Convert budget string to actual budget range
  let budgetRange = "₹3,000-7,000 per day"
  let totalBudget = `₹${(tripDays * 5000).toLocaleString("en-IN")}`

  if (budget === "budget") {
    budgetRange = "₹1,000-3,000 per day"
    totalBudget = `₹${(tripDays * 2000).toLocaleString("en-IN")}`
  } else if (budget === "luxury") {
    budgetRange = "₹7,000+ per day"
    totalBudget = `₹${(tripDays * 10000).toLocaleString("en-IN")}`
  }

  // Create a basic itinerary structure with Indian-specific details
  return {
    tripSummary: {
      destination: destination,
      duration: tripDays,
      startDate: startDate,
      endDate: endDate,
      budget: budgetRange,
      travelGroup: travelGroup,
    },
    transportation: {
      toDestination: [
        {
          type: "Flight",
          details: `Direct flights available from ${departureFrom} to ${destination}`,
          estimatedCost:
            budget === "budget" ? "₹3,500 - ₹7,000" : budget === "luxury" ? "₹12,000 - ₹25,000" : "₹7,000 - ₹12,000",
        },
        {
          type: "Train",
          details: `Regular trains connect ${departureFrom} to ${destination}`,
          estimatedCost:
            budget === "budget" ? "₹800 - ₹1,500" : budget === "luxury" ? "₹2,500 - ₹4,000" : "₹1,500 - ₹2,500",
        },
      ],
      localOptions: [
        {
          type: "Auto Rickshaw",
          details: "Convenient for short distances within the city",
          estimatedCost: "₹30 per km",
        },
        {
          type: "Taxi/Cab",
          details: "Available through apps like Ola and Uber",
          estimatedCost: "₹15-20 per km",
        },
        {
          type: "Local Bus",
          details: "Economical option for getting around",
          estimatedCost: "₹10-50 per trip",
        },
      ],
    },
    accommodation: [
      {
        name: `${budget === "luxury" ? "Luxury" : budget === "budget" ? "Budget" : "Mid-range"} Hotel in ${destination}`,
        description: `Comfortable ${budget === "luxury" ? "5-star" : budget === "budget" ? "budget" : "3-star"} accommodation with all necessary amenities`,
        priceRange:
          budget === "budget"
            ? "₹1,000-2,000 per night"
            : budget === "luxury"
              ? "₹7,000-15,000 per night"
              : "₹3,000-6,000 per night",
        location: `Central ${destination}`,
      },
      {
        name: `${destination} ${budget === "budget" ? "Hostel" : "Resort"}`,
        description: `${budget === "budget" ? "Affordable dormitory-style accommodation" : "Beautiful property with great amenities"}`,
        priceRange:
          budget === "budget"
            ? "₹500-1,000 per night"
            : budget === "luxury"
              ? "₹10,000-20,000 per night"
              : "₹4,000-8,000 per night",
        location: `${budget === "budget" ? "Tourist area" : "Prime location"} in ${destination}`,
      },
    ],
    itinerary: Array.from({ length: tripDays }, (_, i) => {
      const day = i + 1
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      return {
        day: day,
        date: date.toISOString().split("T")[0],
        morning: {
          activity: `Explore ${destination} - Morning Activity ${day}`,
          location: `${destination} Location ${day}A`,
          details: "Enjoy the local sights and sounds",
          estimatedCost: budget === "budget" ? "₹500" : budget === "luxury" ? "₹2,000" : "₹1,000",
        },
        lunch: {
          recommendation: `Local Restaurant ${day}`,
          cuisine: "Indian",
          priceRange: budget === "budget" ? "₹200-400" : budget === "luxury" ? "₹1,000-2,000" : "₹500-1,000",
          location: `${destination} Food Area`,
        },
        afternoon: {
          activity: `${destination} Afternoon Activity ${day}`,
          location: `${destination} Location ${day}B`,
          details: "Continue exploring the area",
          estimatedCost: budget === "budget" ? "₹600" : budget === "luxury" ? "₹2,500" : "₹1,200",
        },
        dinner: {
          recommendation: `Evening Dining Option ${day}`,
          cuisine: "Multi-cuisine",
          priceRange: budget === "budget" ? "₹300-500" : budget === "luxury" ? "₹1,500-3,000" : "₹700-1,400",
          location: `${destination} Dining District`,
        },
        evening: {
          activity: `${destination} Evening Entertainment ${day}`,
          location: `${destination} Location ${day}C`,
          details: "Enjoy the nightlife or cultural show",
          estimatedCost: budget === "budget" ? "₹400" : budget === "luxury" ? "₹3,000" : "₹1,500",
        },
      }
    }),
    highlights: [
      {
        name: `${destination} Highlight 1`,
        description: "A must-visit attraction in the area",
        type: "Attraction",
      },
      {
        name: `${destination} Highlight 2`,
        description: "Famous local experience",
        type: "Experience",
      },
      {
        name: `${destination} Highlight 3`,
        description: "Popular with visitors",
        type: "Landmark",
      },
      {
        name: `${destination} Highlight 4`,
        description: "Don't miss this spot",
        type: "Hidden Gem",
      },
    ],
    estimatedTotalCost: totalBudget,
  }
}

// Function to save itinerary to file
function saveItinerary(id: string, data: any) {
  try {
    const filePath = path.join(STORAGE_DIR, `${id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log(`Saved itinerary to file: ${filePath}`)
    return true
  } catch (error) {
    console.error(`Failed to save itinerary ${id} to file:`, error)
    return false
  }
}

// Function to load itinerary from file
function loadItinerary(id: string) {
  try {
    const filePath = path.join(STORAGE_DIR, `${id}.json`)
    if (!fs.existsSync(filePath)) {
      console.log(`Itinerary file not found: ${filePath}`)
      return null
    }
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load itinerary ${id} from file:`, error)
    return null
  }
}

export async function planTrip(formData: FormData) {
  try {
    // Extract form data
    const departureFrom = formData.get("departureFrom") as string
    const destination = formData.get("destination") as string
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const interests = formData.get("interests") as string
    const budget = formData.get("budget") as string
    const travelGroup = formData.get("travelGroup") as string

    console.log("Planning trip with inputs:", { departureFrom, destination, startDate, endDate, budget, travelGroup })

    // Calculate trip duration
    const start = new Date(startDate)
    const end = new Date(endDate)
    const tripDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (tripDays < 1) {
      console.error("Invalid dates: End date must be after start date")
      return { success: false, error: "End date must be after start date" }
    }

    // Check if we have a predefined itinerary for this destination
    if (predefinedItineraries[destination]) {
      console.log(`Using predefined itinerary for ${destination}`)
      return await createPredefinedItinerary(destination)
    }

    // Create prompt for AI
    const prompt = `
      Create a detailed ${tripDays}-day travel itinerary for an Indian traveler going from ${departureFrom} to ${destination}.
      Trip starts on ${startDate} and ends on ${endDate}.
      Traveler is going with: ${travelGroup}.
      Budget level: ${budget} (${budget === "budget" ? "₹1,000-3,000" : budget === "luxury" ? "₹7,000+" : "₹3,000-7,000"} per day).
      Interests and preferences: ${interests || "General sightseeing and local experiences"}.
      
      Return ONLY a valid JSON object with this exact structure:
      {
        "tripSummary": {
          "destination": string,
          "duration": number,
          "startDate": string,
          "endDate": string,
          "budget": string,
          "travelGroup": string
        },
        "transportation": {
          "toDestination": [
            { "type": string, "details": string, "estimatedCost": string }
          ],
          "localOptions": [
            { "type": string, "details": string, "estimatedCost": string }
          ]
        },
        "accommodation": [
          { "name": string, "description": string, "priceRange": string, "location": string }
        ],
        "itinerary": [
          {
            "day": number,
            "date": string,
            "morning": { "activity": string, "location": string, "details": string, "estimatedCost": string },
            "lunch": { "recommendation": string, "cuisine": string, "priceRange": string, "location": string },
            "afternoon": { "activity": string, "location": string, "details": string, "estimatedCost": string },
            "dinner": { "recommendation": string, "cuisine": string, "priceRange": string, "location": string },
            "evening": { "activity": string, "location": string, "details": string, "estimatedCost": string }
          }
        ],
        "highlights": [
          { "name": string, "description": string, "type": string }
        ],
        "estimatedTotalCost": string
      }
      
      Make sure all costs are in Indian Rupees (₹) and appropriate for the selected budget level.
      Be specific with restaurant names, attraction names, and hotel names.
      Include authentic Indian experiences and cuisine options.
    `

    let itineraryData

    try {
      // Try to generate itinerary using Groq
      console.log("Calling Groq API...")
      const { text } = await generateText({
        model: groq("llama3-70b-8192"),
        prompt,
        temperature: 0.7,
        maxTokens: 4000,
        system:
          "You are a travel planning assistant that specializes in creating detailed itineraries for Indian destinations. You always respond with valid JSON only, no explanations or markdown.",
      })

      console.log("Groq response received, attempting to parse JSON")

      // Try to extract JSON from the response
      itineraryData = extractJsonFromText(text)
      console.log("Successfully parsed JSON from Groq response")
    } catch (error) {
      console.error("Error generating itinerary with Groq:", error)
      console.log("Using fallback itinerary data")

      // Use fallback data if AI generation fails
      itineraryData = createFallbackItinerary(
        departureFrom,
        destination,
        startDate,
        endDate,
        interests,
        budget,
        travelGroup,
        tripDays,
      )
    }

    // Fetch images for the destination
    console.log(`Fetching images for destination: ${destination}`)
    const destinationImages = await getDestinationImages(destination)
    console.log("Fetched images:", destinationImages)

    // Generate a unique ID for this itinerary
    const itineraryId = uuidv4()
    console.log(`Generated itinerary ID: ${itineraryId}`)

    // Create the itinerary object
    const itineraryObject = {
      id: itineraryId,
      userInput: {
        departureFrom,
        destination,
        startDate,
        endDate,
        interests,
        budget,
        travelGroup,
      },
      data: itineraryData,
      images: destinationImages,
      createdAt: new Date().toISOString(),
    }

    // Save the itinerary to file
    const saved = saveItinerary(itineraryId, itineraryObject)
    if (!saved) {
      console.error(`Failed to save itinerary with ID: ${itineraryId}`)
      return { success: false, error: "Failed to save itinerary. Please try again." }
    }

    // Also store the ID in a cookie for backup retrieval
    cookies().set("lastItineraryId", itineraryId, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    console.log(`Successfully created itinerary with ID: ${itineraryId}`)
    return { success: true, itineraryId }
  } catch (error) {
    console.error("Error planning trip:", error)
    return { success: false, error: "Failed to generate itinerary. Please try again." }
  }
}

// Function to get an itinerary by ID
export async function getItinerary(id: string) {
  console.log(`Fetching itinerary with ID: ${id}`)

  // Try to load from file
  const itinerary = loadItinerary(id)

  if (!itinerary) {
    console.log(`Itinerary with ID ${id} not found in file storage`)

    // Check if this is the last created itinerary from cookie
    const lastId = cookies().get("lastItineraryId")?.value
    if (lastId && lastId === id) {
      console.log(`ID ${id} matches last created itinerary ID from cookie, but file not found`)
    }

    return null
  }

  console.log(`Found itinerary with ID: ${id}`)
  return itinerary
}

// Function to create a predefined itinerary
export async function createPredefinedItinerary(destination: string) {
  try {
    console.log(`Creating predefined itinerary for ${destination}`)

    // Check if we have a predefined itinerary for this destination
    if (!predefinedItineraries[destination]) {
      console.error(`No predefined itinerary found for ${destination}`)
      return { success: false, error: `No predefined itinerary found for ${destination}` }
    }

    // Get the predefined data
    const predefinedData = predefinedItineraries[destination]

    // Update dates to be current
    const today = new Date()
    const startDate = today.toISOString().split("T")[0]

    const duration = predefinedData.data.tripSummary.duration || 3
    const endDate = new Date(today.getTime() + (duration - 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    // Update the dates in the itinerary
    const updatedData = JSON.parse(JSON.stringify(predefinedData.data))
    updatedData.tripSummary.startDate = startDate
    updatedData.tripSummary.endDate = endDate

    // Update the dates for each day in the itinerary
    updatedData.itinerary.forEach((day: any, index: number) => {
      const date = new Date(today.getTime() + index * 24 * 60 * 60 * 1000)
      day.date = date.toISOString().split("T")[0]
    })

    // Generate a unique ID for this itinerary
    const itineraryId = uuidv4()

    // Create the itinerary object
    const itineraryObject = {
      id: itineraryId,
      userInput: {
        departureFrom: "Delhi", // Default departure
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        interests: "General sightseeing and local experiences",
        budget: "moderate",
        travelGroup: predefinedData.data.tripSummary.travelGroup || "couple",
      },
      data: updatedData,
      images: predefinedData.images,
      createdAt: new Date().toISOString(),
    }

    // Save the itinerary to file
    const saved = saveItinerary(itineraryId, itineraryObject)
    if (!saved) {
      console.error(`Failed to save predefined itinerary with ID: ${itineraryId}`)
      return { success: false, error: "Failed to save itinerary. Please try again." }
    }

    // Also store the ID in a cookie for backup retrieval
    cookies().set("lastItineraryId", itineraryId, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    console.log(`Successfully created predefined itinerary for ${destination} with ID: ${itineraryId}`)
    return { success: true, itineraryId }
  } catch (error) {
    console.error(`Error creating predefined itinerary for ${destination}:`, error)
    return { success: false, error: "Failed to create predefined itinerary. Please try again." }
  }
}

// Function to create a direct itinerary (for debugging)
export async function createDirectItinerary(
  departureFrom: string,
  destination: string,
  startDate: string,
  endDate: string,
  interests: string,
  budget: string,
  travelGroup: string,
) {
  try {
    // Check if we have a predefined itinerary for this destination
    if (predefinedItineraries[destination]) {
      console.log(`Using predefined itinerary for ${destination}`)
      return await createPredefinedItinerary(destination)
    }

    // Calculate trip duration
    const start = new Date(startDate)
    const end = new Date(endDate)
    const tripDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (tripDays < 1) {
      return { success: false, error: "End date must be after start date" }
    }

    // Create fallback itinerary
    const itineraryData = createFallbackItinerary(
      departureFrom,
      destination,
      startDate,
      endDate,
      interests,
      budget,
      travelGroup,
      tripDays,
    )

    // Fetch images for the destination
    const destinationImages = await getDestinationImages(destination)

    // Generate a unique ID for this itinerary
    const itineraryId = uuidv4()

    // Create the itinerary object
    const itineraryObject = {
      id: itineraryId,
      userInput: {
        departureFrom,
        destination,
        startDate,
        endDate,
        interests,
        budget,
        travelGroup,
      },
      data: itineraryData,
      images: destinationImages,
      createdAt: new Date().toISOString(),
    }

    // Save the itinerary to file
    const saved = saveItinerary(itineraryId, itineraryObject)
    if (!saved) {
      return { success: false, error: "Failed to save itinerary" }
    }

    // Also store the ID in a cookie for backup retrieval
    cookies().set("lastItineraryId", itineraryId, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, itineraryId }
  } catch (error) {
    console.error("Error creating direct itinerary:", error)
    return { success: false, error: "Failed to create itinerary" }
  }
}
