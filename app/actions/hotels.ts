"use server"

// This would connect to real hotel APIs in a production environment
// For now, we'll simulate the data with India-specific options

interface HotelSearchParams {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
}

interface HotelOption {
  id: string
  name: string
  rating: number
  price: string
  location: string
  image: string
  amenities: string[]
}

export async function searchHotels(params: HotelSearchParams) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate mock data based on search parameters
  const options: HotelOption[] = [
    {
      id: "h1",
      name: "Taj Hotel",
      rating: 5,
      price: "₹8,500/night",
      location: `Central ${params.destination}`,
      image: "/placeholder.svg?height=200&width=400&text=Taj+Hotel",
      amenities: ["Free WiFi", "Breakfast Included", "Swimming Pool", "Spa"],
    },
    {
      id: "h2",
      name: "OYO Premium",
      rating: 3.5,
      price: "₹1,999/night",
      location: `${params.destination} Main Market`,
      image: "/placeholder.svg?height=200&width=400&text=OYO+Premium",
      amenities: ["Free WiFi", "AC Rooms", "Room Service"],
    },
    {
      id: "h3",
      name: "Fabhotel",
      rating: 3,
      price: "₹1,499/night",
      location: `North ${params.destination}`,
      image: "/placeholder.svg?height=200&width=400&text=Fabhotel",
      amenities: ["Free WiFi", "Breakfast Available", "AC Rooms"],
    },
    {
      id: "h4",
      name: "The Leela Palace",
      rating: 5,
      price: "₹12,500/night",
      location: `Luxury District, ${params.destination}`,
      image: "/placeholder.svg?height=200&width=400&text=The+Leela+Palace",
      amenities: ["Free WiFi", "Spa", "Fine Dining", "Concierge Service"],
    },
  ]

  return options
}
