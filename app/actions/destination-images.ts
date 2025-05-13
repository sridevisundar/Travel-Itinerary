"use server"

interface DestinationImage {
  url: string
  alt: string
}

// Map of popular Indian destinations to placeholder images
// In a real app, you would use a real image API
const destinationImageMap: Record<string, string[]> = {
  delhi: [
    "https://commons.wikimedia.org/wiki/File:India_Gate_on_an_evening.jpg",
    "https://commons.wikimedia.org/wiki/File:Red_Fort_in_Delhi_03-2016_img3.jpg",
    "https://commons.wikimedia.org/wiki/File:Qutub_Minar_6.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d2/Tomb_of_Humayun%2C_Delhi.jpg",
  ],
  mumbai: [
    "/placeholder.svg?height=400&width=600&text=Gateway+of+India",
    "/placeholder.svg?height=400&width=600&text=Marine+Drive",
    "/placeholder.svg?height=400&width=600&text=Elephanta+Caves",
    "/placeholder.svg?height=400&width=600&text=Chhatrapati+Shivaji+Terminus",
  ],
  goa: [
    "/placeholder.svg?height=400&width=600&text=Calangute+Beach",
    "/placeholder.svg?height=400&width=600&text=Basilica+of+Bom+Jesus",
    "/placeholder.svg?height=400&width=600&text=Dudhsagar+Falls",
    "/placeholder.svg?height=400&width=600&text=Fort+Aguada",
  ],
  jaipur: [
    "/placeholder.svg?height=400&width=600&text=Hawa+Mahal",
    "/placeholder.svg?height=400&width=600&text=Amber+Fort",
    "/placeholder.svg?height=400&width=600&text=City+Palace",
    "/placeholder.svg?height=400&width=600&text=Jantar+Mantar",
  ],
  agra: [
    "/placeholder.svg?height=400&width=600&text=Taj+Mahal",
    "/placeholder.svg?height=400&width=600&text=Agra+Fort",
    "/placeholder.svg?height=400&width=600&text=Fatehpur+Sikri",
    "/placeholder.svg?height=400&width=600&text=Mehtab+Bagh",
  ],
  varanasi: [
    "/placeholder.svg?height=400&width=600&text=Ganges+River",
    "/placeholder.svg?height=400&width=600&text=Kashi+Vishwanath+Temple",
    "/placeholder.svg?height=400&width=600&text=Dashashwamedh+Ghat",
    "/placeholder.svg?height=400&width=600&text=Sarnath",
  ],
  kolkata: [
    "/placeholder.svg?height=400&width=600&text=Victoria+Memorial",
    "/placeholder.svg?height=400&width=600&text=Howrah+Bridge",
    "/placeholder.svg?height=400&width=600&text=Park+Street",
    "/placeholder.svg?height=400&width=600&text=Indian+Museum",
  ],
  bangalore: [
    "/placeholder.svg?height=400&width=600&text=Lalbagh+Botanical+Garden",
    "/placeholder.svg?height=400&width=600&text=Bangalore+Palace",
    "/placeholder.svg?height=400&width=600&text=Cubbon+Park",
    "/placeholder.svg?height=400&width=600&text=ISKCON+Temple",
  ],
  chennai: [
    "/placeholder.svg?height=400&width=600&text=Marina+Beach",
    "/placeholder.svg?height=400&width=600&text=Kapaleeshwarar+Temple",
    "/placeholder.svg?height=400&width=600&text=Fort+St.+George",
    "/placeholder.svg?height=400&width=600&text=Government+Museum",
  ],
  hyderabad: [
    "/placeholder.svg?height=400&width=600&text=Charminar",
    "/placeholder.svg?height=400&width=600&text=Golconda+Fort",
    "/placeholder.svg?height=400&width=600&text=Hussain+Sagar+Lake",
    "/placeholder.svg?height=400&width=600&text=Ramoji+Film+City",
  ],
}

export async function getDestinationImages(destination: string): Promise<DestinationImage[]> {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Normalize destination name for lookup
    const normalizedDestination = destination.toLowerCase().trim()

    // Check if we have predefined images for this destination
    let imageUrls: string[] = []

    // Look for exact matches first
    if (destinationImageMap[normalizedDestination]) {
      imageUrls = destinationImageMap[normalizedDestination]
    } else {
      // Look for partial matches
      for (const [key, urls] of Object.entries(destinationImageMap)) {
        if (normalizedDestination.includes(key) || key.includes(normalizedDestination)) {
          imageUrls = urls
          break
        }
      }

      // If no match found, use generic images
      if (imageUrls.length === 0) {
        imageUrls = [
          `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination + " 1")}`,
          `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination + " 2")}`,
          `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination + " 3")}`,
          `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination + " 4")}`,
        ]
      }
    }

    // Convert URLs to image objects
    return imageUrls.map((url, index) => ({
      url,
      alt: `${destination} view ${index + 1}`,
    }))
  } catch (error) {
    console.error("Error fetching destination images:", error)
    return []
  }
}
