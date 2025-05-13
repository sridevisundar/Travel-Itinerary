export const PREDEFINED_DESTINATIONS = ["Goa", "Delhi", "Jaipur", "Mumbai", "Varanasi", "Kerala"]

export interface PredefinedItinerary {
  destination: string
  data: any
  images: { url: string; alt: string }[]
}

export const predefinedItineraries: Record<string, PredefinedItinerary> = {
  Goa: {
    destination: "Goa",
    data: {
      tripSummary: {
        destination: "Goa",
        duration: 4,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹3,000-7,000 per day",
        travelGroup: "couple",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights available from Delhi to Goa (Dabolim Airport)",
            estimatedCost: "₹7,000 - ₹12,000",
          },
          {
            type: "Train",
            details: "Overnight trains connect Delhi to Goa (Madgaon Station)",
            estimatedCost: "₹1,500 - ₹2,500",
          },
        ],
        localOptions: [
          {
            type: "Scooter Rental",
            details: "Most popular way to get around Goa",
            estimatedCost: "₹300-500 per day",
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
          name: "Beach Resort in North Goa",
          description: "Comfortable 3-star accommodation near Calangute Beach",
          priceRange: "₹3,000-6,000 per night",
          location: "Calangute, North Goa",
        },
        {
          name: "Boutique Hotel in South Goa",
          description: "Peaceful property with beautiful views and amenities",
          priceRange: "₹4,000-8,000 per night",
          location: "Palolem, South Goa",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Calangute Beach Visit",
            location: "Calangute, North Goa",
            details: "Enjoy the sun and sand at one of Goa's most popular beaches",
            estimatedCost: "₹500 (beach activities)",
          },
          lunch: {
            recommendation: "Souza Lobo",
            cuisine: "Goan Seafood",
            priceRange: "₹800-1,200",
            location: "Calangute Beach Road",
          },
          afternoon: {
            activity: "Water Sports at Baga Beach",
            location: "Baga Beach",
            details: "Try parasailing, jet skiing, or banana boat rides",
            estimatedCost: "₹1,500 (for 2-3 activities)",
          },
          dinner: {
            recommendation: "Britto's",
            cuisine: "Multi-cuisine with seafood specialties",
            priceRange: "₹1,000-1,500",
            location: "Baga Beach",
          },
          evening: {
            activity: "Tito's Lane Nightlife",
            location: "Baga, North Goa",
            details: "Experience Goa's famous nightlife at the popular clubs",
            estimatedCost: "₹1,000-2,000 (entry and drinks)",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Old Goa Churches Tour",
            location: "Old Goa",
            details: "Visit the UNESCO World Heritage churches including Basilica of Bom Jesus",
            estimatedCost: "₹500 (transportation and donations)",
          },
          lunch: {
            recommendation: "Mum's Kitchen",
            cuisine: "Authentic Goan",
            priceRange: "₹700-1,000",
            location: "Panjim",
          },
          afternoon: {
            activity: "Panjim City Walk",
            location: "Fontainhas, Panjim",
            details: "Explore the colorful Latin Quarter and Portuguese architecture",
            estimatedCost: "₹300 (including small purchases)",
          },
          dinner: {
            recommendation: "Fisherman's Wharf",
            cuisine: "Seafood",
            priceRange: "₹1,200-1,800",
            location: "Ribandar, Near Panjim",
          },
          evening: {
            activity: "Sunset River Cruise",
            location: "Mandovi River",
            details: "Enjoy cultural performances on a sunset cruise",
            estimatedCost: "₹500 per person",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Dudhsagar Waterfall Trip",
            location: "Mollem National Park",
            details: "Visit one of India's tallest waterfalls (jeep safari)",
            estimatedCost: "₹2,000 per person (organized tour)",
          },
          lunch: {
            recommendation: "Spice Plantation Lunch",
            cuisine: "Traditional Goan Thali",
            priceRange: "₹500-700",
            location: "Ponda Spice Plantation",
          },
          afternoon: {
            activity: "Spice Plantation Tour",
            location: "Ponda",
            details: "Learn about spices and their cultivation",
            estimatedCost: "₹400 per person (tour fee)",
          },
          dinner: {
            recommendation: "Martin's Corner",
            cuisine: "Goan and Portuguese",
            priceRange: "₹1,000-1,500",
            location: "Betalbatim, South Goa",
          },
          evening: {
            activity: "Relaxing Beach Walk",
            location: "Colva Beach",
            details: "Enjoy a peaceful evening by the sea",
            estimatedCost: "Free",
          },
        },
        {
          day: 4,
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Anjuna Flea Market",
            location: "Anjuna, North Goa",
            details: "Shop for souvenirs, clothes, and handicrafts at the famous market (Wednesdays only)",
            estimatedCost: "₹1,000-2,000 (shopping)",
          },
          lunch: {
            recommendation: "Curlies Beach Shack",
            cuisine: "Beach Cafe Food",
            priceRange: "₹600-900",
            location: "Anjuna Beach",
          },
          afternoon: {
            activity: "Vagator and Chapora Fort",
            location: "Vagator, North Goa",
            details: "Visit the fort and enjoy views of the Arabian Sea",
            estimatedCost: "₹300 (transportation)",
          },
          dinner: {
            recommendation: "Thalassa",
            cuisine: "Greek and Mediterranean",
            priceRange: "₹1,500-2,500",
            location: "Vagator",
          },
          evening: {
            activity: "Sunset at Arambol Beach",
            location: "Arambol, North Goa",
            details: "Experience the hippie culture and drum circles",
            estimatedCost: "₹500 (transportation and refreshments)",
          },
        },
      ],
      highlights: [
        {
          name: "Beaches of Goa",
          description: "From lively Baga to peaceful Palolem, Goa's beaches offer something for everyone",
          type: "Natural Beauty",
        },
        {
          name: "Portuguese Heritage",
          description: "Explore centuries of Portuguese influence in architecture and culture",
          type: "Cultural",
        },
        {
          name: "Seafood Cuisine",
          description: "Fresh catches prepared with Goan spices and Portuguese techniques",
          type: "Culinary",
        },
        {
          name: "Dudhsagar Falls",
          description: "One of India's tallest waterfalls, surrounded by lush forest",
          type: "Adventure",
        },
      ],
      estimatedTotalCost: "₹40,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Calangute+Beach",
        alt: "Calangute Beach, Goa",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Old+Goa+Churches",
        alt: "Historic churches in Old Goa",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Dudhsagar+Falls",
        alt: "Dudhsagar Waterfall",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Goan+Cuisine",
        alt: "Traditional Goan seafood",
      },
    ],
  },
  Delhi: {
    destination: "Delhi",
    data: {
      tripSummary: {
        destination: "Delhi",
        duration: 3,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹3,000-7,000 per day",
        travelGroup: "family",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights available to Delhi from major Indian cities",
            estimatedCost: "₹5,000 - ₹10,000",
          },
          {
            type: "Train",
            details: "Well-connected by railways to all major cities",
            estimatedCost: "₹1,000 - ₹2,500",
          },
        ],
        localOptions: [
          {
            type: "Delhi Metro",
            details: "Extensive network covering most tourist spots",
            estimatedCost: "₹20-60 per trip",
          },
          {
            type: "Auto Rickshaw",
            details: "Convenient for short distances",
            estimatedCost: "₹30-150 per trip",
          },
          {
            type: "Taxi/Cab",
            details: "Available through apps like Ola and Uber",
            estimatedCost: "₹15-20 per km",
          },
        ],
      },
      accommodation: [
        {
          name: "Hotel in Connaught Place",
          description: "Central location with easy access to major attractions",
          priceRange: "₹3,000-6,000 per night",
          location: "Connaught Place, Central Delhi",
        },
        {
          name: "Karol Bagh Hotel",
          description: "Mid-range accommodation in a popular shopping area",
          priceRange: "₹2,000-4,000 per night",
          location: "Karol Bagh, Central Delhi",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Red Fort Visit",
            location: "Old Delhi",
            details: "Explore the historic Mughal fort complex",
            estimatedCost: "₹500 (entry tickets for family)",
          },
          lunch: {
            recommendation: "Karim's",
            cuisine: "Mughlai",
            priceRange: "₹800-1,200",
            location: "Near Jama Masjid, Old Delhi",
          },
          afternoon: {
            activity: "Jama Masjid and Chandni Chowk",
            location: "Old Delhi",
            details: "Visit India's largest mosque and explore the bustling market",
            estimatedCost: "₹300 (donations and rickshaw rides)",
          },
          dinner: {
            recommendation: "Paranthe Wali Gali",
            cuisine: "North Indian Street Food",
            priceRange: "₹500-800",
            location: "Chandni Chowk, Old Delhi",
          },
          evening: {
            activity: "Light and Sound Show at Red Fort",
            location: "Red Fort, Old Delhi",
            details: "Learn about the fort's history through an engaging show",
            estimatedCost: "₹600 (tickets for family)",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Qutub Minar Complex",
            location: "Mehrauli, South Delhi",
            details: "Explore the UNESCO World Heritage Site with the tallest brick minaret",
            estimatedCost: "₹600 (entry tickets for family)",
          },
          lunch: {
            recommendation: "Lodi - The Garden Restaurant",
            cuisine: "Multi-cuisine",
            priceRange: "₹1,500-2,500",
            location: "Lodhi Road",
          },
          afternoon: {
            activity: "Humayun's Tomb",
            location: "Nizamuddin East",
            details: "Visit the magnificent tomb that inspired the Taj Mahal",
            estimatedCost: "₹600 (entry tickets for family)",
          },
          dinner: {
            recommendation: "Bukhara, ITC Maurya",
            cuisine: "North Indian",
            priceRange: "₹3,000-5,000",
            location: "Diplomatic Enclave",
          },
          evening: {
            activity: "Dilli Haat Shopping",
            location: "INA, South Delhi",
            details: "Shop for handicrafts from across India",
            estimatedCost: "₹1,000-2,000 (entry and shopping)",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "India Gate and Rashtrapati Bhavan",
            location: "Central Delhi",
            details: "Visit the war memorial and see the President's residence",
            estimatedCost: "Free (transportation ₹300)",
          },
          lunch: {
            recommendation: "United Coffee House",
            cuisine: "Continental and Indian",
            priceRange: "₹1,200-2,000",
            location: "Connaught Place",
          },
          afternoon: {
            activity: "National Museum",
            location: "Janpath",
            details: "Explore India's rich cultural heritage",
            estimatedCost: "₹500 (entry tickets for family)",
          },
          dinner: {
            recommendation: "Saravana Bhavan",
            cuisine: "South Indian",
            priceRange: "₹800-1,200",
            location: "Connaught Place",
          },
          evening: {
            activity: "Akshardham Temple Light Show",
            location: "Noida Mor",
            details: "Spectacular fountain and light show at the temple complex",
            estimatedCost: "₹800 (tickets for family)",
          },
        },
      ],
      highlights: [
        {
          name: "Mughal Architecture",
          description: "Red Fort, Humayun's Tomb, and Jama Masjid showcase the grandeur of Mughal design",
          type: "Historical",
        },
        {
          name: "Street Food",
          description: "Delhi is famous for its diverse street food, from chaat to kebabs",
          type: "Culinary",
        },
        {
          name: "Shopping Markets",
          description: "From luxury malls to traditional bazaars like Chandni Chowk",
          type: "Shopping",
        },
        {
          name: "Religious Diversity",
          description: "Temples, mosques, churches, and gurudwaras representing India's religious tapestry",
          type: "Cultural",
        },
      ],
      estimatedTotalCost: "₹30,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Red+Fort",
        alt: "Red Fort, Delhi",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Qutub+Minar",
        alt: "Qutub Minar, Delhi",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=India+Gate",
        alt: "India Gate, Delhi",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Delhi+Street+Food",
        alt: "Famous Delhi street food",
      },
    ],
  },
  Jaipur: {
    destination: "Jaipur",
    data: {
      tripSummary: {
        destination: "Jaipur",
        duration: 3,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹3,000-7,000 per day",
        travelGroup: "couple",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights to Jaipur from major Indian cities",
            estimatedCost: "₹5,000 - ₹10,000",
          },
          {
            type: "Train",
            details: "Well-connected by railways, especially from Delhi",
            estimatedCost: "₹800 - ₹1,500",
          },
        ],
        localOptions: [
          {
            type: "Auto Rickshaw",
            details: "Convenient for city travel",
            estimatedCost: "₹30-150 per trip",
          },
          {
            type: "Taxi/Cab",
            details: "Available through apps like Ola and Uber",
            estimatedCost: "₹15-20 per km",
          },
          {
            type: "Rental Scooter/Bike",
            details: "Good option for exploring at your own pace",
            estimatedCost: "₹300-600 per day",
          },
        ],
      },
      accommodation: [
        {
          name: "Heritage Haveli in Old City",
          description: "Traditional Rajasthani mansion converted to hotel",
          priceRange: "₹3,000-6,000 per night",
          location: "Near City Palace, Pink City",
        },
        {
          name: "Boutique Hotel in Civil Lines",
          description: "Modern amenities with Rajasthani decor",
          priceRange: "₹4,000-7,000 per night",
          location: "Civil Lines, Jaipur",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Amber Fort Visit",
            location: "Amer, Jaipur",
            details: "Explore the magnificent hilltop fort with elephant rides available",
            estimatedCost: "₹1,000 (entry tickets and elephant ride)",
          },
          lunch: {
            recommendation: "1135 AD",
            cuisine: "Royal Rajasthani",
            priceRange: "₹1,500-2,500",
            location: "Inside Amber Fort",
          },
          afternoon: {
            activity: "Jal Mahal and Jaigarh Fort",
            location: "Amer Road",
            details: "Visit the Water Palace and the fort with the world's largest cannon",
            estimatedCost: "₹600 (entry tickets)",
          },
          dinner: {
            recommendation: "Chokhi Dhani",
            cuisine: "Traditional Rajasthani Thali",
            priceRange: "₹1,200-1,800 per person",
            location: "Tonk Road",
          },
          evening: {
            activity: "Cultural Show at Chokhi Dhani",
            location: "Tonk Road",
            details: "Experience traditional Rajasthani village life, music and dance",
            estimatedCost: "Included with dinner",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "City Palace and Jantar Mantar",
            location: "Pink City",
            details: "Explore the royal residence and the ancient astronomical observatory",
            estimatedCost: "₹1,000 (entry tickets)",
          },
          lunch: {
            recommendation: "Samode Haveli",
            cuisine: "Rajasthani and North Indian",
            priceRange: "₹1,200-2,000",
            location: "Gangapole",
          },
          afternoon: {
            activity: "Hawa Mahal and Shopping in Johari Bazaar",
            location: "Pink City",
            details: "Visit the Palace of Winds and shop for jewelry and textiles",
            estimatedCost: "₹500 (entry) + ₹1,000-3,000 (shopping)",
          },
          dinner: {
            recommendation: "Peacock Rooftop Restaurant",
            cuisine: "Multi-cuisine",
            priceRange: "₹800-1,500",
            location: "Hotel Pearl Palace, Hathroi Fort",
          },
          evening: {
            activity: "Light and Sound Show at Amer Fort",
            location: "Amer",
            details: "Learn about the history of the fort through an engaging show",
            estimatedCost: "₹600 (tickets for two)",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Albert Hall Museum",
            location: "Ram Niwas Garden",
            details: "Explore the oldest museum in Rajasthan with diverse collections",
            estimatedCost: "₹300 (entry tickets)",
          },
          lunch: {
            recommendation: "Tapri Central",
            cuisine: "Cafe Food and Chai",
            priceRange: "₹600-1,000",
            location: "C-Scheme",
          },
          afternoon: {
            activity: "Block Printing Workshop",
            location: "Sanganer",
            details: "Learn the traditional Rajasthani textile printing technique",
            estimatedCost: "₹1,000 per person (workshop fee)",
          },
          dinner: {
            recommendation: "Spice Court",
            cuisine: "Rajasthani and North Indian",
            priceRange: "₹1,000-1,500",
            location: "Civil Lines",
          },
          evening: {
            activity: "Nahargarh Fort Sunset",
            location: "Nahargarh",
            details: "Enjoy panoramic views of Jaipur city at sunset",
            estimatedCost: "₹400 (entry and transportation)",
          },
        },
      ],
      highlights: [
        {
          name: "Pink City Architecture",
          description: "The distinctive terracotta pink buildings of Jaipur's old city",
          type: "Architectural",
        },
        {
          name: "Royal Heritage",
          description: "Forts and palaces showcasing Rajasthan's royal history",
          type: "Historical",
        },
        {
          name: "Traditional Crafts",
          description: "Block printing, blue pottery, and jewelry making",
          type: "Cultural",
        },
        {
          name: "Rajasthani Cuisine",
          description: "Dal Baati Churma, Laal Maas, and other local delicacies",
          type: "Culinary",
        },
      ],
      estimatedTotalCost: "₹35,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Amber+Fort",
        alt: "Amber Fort, Jaipur",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Hawa+Mahal",
        alt: "Hawa Mahal (Palace of Winds), Jaipur",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=City+Palace",
        alt: "City Palace, Jaipur",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Rajasthani+Thali",
        alt: "Traditional Rajasthani Thali",
      },
    ],
  },
  Mumbai: {
    destination: "Mumbai",
    data: {
      tripSummary: {
        destination: "Mumbai",
        duration: 4,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹4,000-8,000 per day",
        travelGroup: "friends",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights to Mumbai from all major Indian cities",
            estimatedCost: "₹5,000 - ₹12,000",
          },
          {
            type: "Train",
            details: "Well-connected by railways to most cities",
            estimatedCost: "₹1,000 - ₹3,000",
          },
        ],
        localOptions: [
          {
            type: "Local Train",
            details: "Fastest way to travel within the city",
            estimatedCost: "₹10-30 per trip",
          },
          {
            type: "Auto Rickshaw",
            details: "Available in suburbs, not in South Mumbai",
            estimatedCost: "₹30-150 per trip",
          },
          {
            type: "Taxi/Cab",
            details: "Black and yellow taxis or app-based cabs",
            estimatedCost: "₹20-25 per km",
          },
        ],
      },
      accommodation: [
        {
          name: "Hotel in Colaba",
          description: "Central location near major tourist attractions",
          priceRange: "₹4,000-8,000 per night",
          location: "Colaba, South Mumbai",
        },
        {
          name: "Boutique Hotel in Bandra",
          description: "Trendy area with good nightlife and shopping",
          priceRange: "₹5,000-9,000 per night",
          location: "Bandra West",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Gateway of India and Taj Mahal Palace Hotel",
            location: "Colaba, South Mumbai",
            details: "Visit Mumbai's iconic landmark and the historic luxury hotel",
            estimatedCost: "Free (Gateway of India)",
          },
          lunch: {
            recommendation: "Leopold Cafe",
            cuisine: "Multi-cuisine",
            priceRange: "₹1,000-1,500",
            location: "Colaba Causeway",
          },
          afternoon: {
            activity: "Colaba Causeway Shopping",
            location: "Colaba",
            details: "Shop for souvenirs, clothes, and accessories at this popular market",
            estimatedCost: "₹1,000-3,000 (shopping)",
          },
          dinner: {
            recommendation: "Trishna",
            cuisine: "Seafood",
            priceRange: "₹1,500-2,500",
            location: "Fort Area",
          },
          evening: {
            activity: "Marine Drive Stroll",
            location: "Marine Drive",
            details: "Walk along the 'Queen's Necklace' and enjoy the sea view",
            estimatedCost: "Free",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Elephanta Caves",
            location: "Elephanta Island",
            details: "Take a ferry to the UNESCO World Heritage Site with ancient cave temples",
            estimatedCost: "₹1,000 (ferry and entry tickets)",
          },
          lunch: {
            recommendation: "Britannia & Co.",
            cuisine: "Parsi",
            priceRange: "₹800-1,200",
            location: "Ballard Estate",
          },
          afternoon: {
            activity: "Chhatrapati Shivaji Terminus and Crawford Market",
            location: "Fort Area",
            details: "Visit the historic railway station and bustling market",
            estimatedCost: "₹500 (transportation and small purchases)",
          },
          dinner: {
            recommendation: "The Table",
            cuisine: "International",
            priceRange: "₹2,500-4,000",
            location: "Colaba",
          },
          evening: {
            activity: "Pub Hopping in Colaba",
            location: "Colaba",
            details: "Experience Mumbai's nightlife at popular bars",
            estimatedCost: "₹2,000-3,000 (drinks and snacks)",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Dharavi Slum Tour",
            location: "Dharavi",
            details: "Take a guided tour of Asia's largest slum and its thriving industries",
            estimatedCost: "₹1,000 per person (guided tour)",
          },
          lunch: {
            recommendation: "Shree Thaker Bhojanalay",
            cuisine: "Gujarati Thali",
            priceRange: "₹500-800",
            location: "Kalbadevi",
          },
          afternoon: {
            activity: "Bollywood Tour",
            location: "Film City, Goregaon",
            details: "Visit film studios and learn about Indian cinema",
            estimatedCost: "₹1,500 per person (organized tour)",
          },
          dinner: {
            recommendation: "Masala Library",
            cuisine: "Modern Indian",
            priceRange: "₹2,500-4,000",
            location: "Bandra Kurla Complex",
          },
          evening: {
            activity: "Comedy Show or Live Music",
            location: "Various venues in Bandra/Andheri",
            details: "Experience Mumbai's entertainment scene",
            estimatedCost: "₹1,000-1,500 per person (tickets)",
          },
        },
        {
          day: 4,
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Bandra Bandstand and Worli Sea Link",
            location: "Bandra",
            details: "Visit the promenade, see celebrity homes, and drive across the iconic bridge",
            estimatedCost: "₹500 (transportation and toll)",
          },
          lunch: {
            recommendation: "Bombay Canteen",
            cuisine: "Contemporary Indian",
            priceRange: "₹1,500-2,500",
            location: "Lower Parel",
          },
          afternoon: {
            activity: "Shopping at High Street Phoenix",
            location: "Lower Parel",
            details: "Shop at Mumbai's premium mall",
            estimatedCost: "₹2,000-5,000 (shopping)",
          },
          dinner: {
            recommendation: "Mahesh Lunch Home",
            cuisine: "Mangalorean Seafood",
            priceRange: "₹1,500-2,500",
            location: "Fort",
          },
          evening: {
            activity: "Juhu Beach Visit",
            location: "Juhu",
            details: "Enjoy street food and the beach atmosphere",
            estimatedCost: "₹500-1,000 (food and transportation)",
          },
        },
      ],
      highlights: [
        {
          name: "Colonial Architecture",
          description: "Gothic and Art Deco buildings showcasing Mumbai's colonial past",
          type: "Architectural",
        },
        {
          name: "Street Food",
          description: "Vada Pav, Pav Bhaji, and other Mumbai specialties",
          type: "Culinary",
        },
        {
          name: "Bollywood",
          description: "The heart of India's film industry",
          type: "Entertainment",
        },
        {
          name: "Urban Beaches",
          description: "Juhu, Girgaum Chowpatty, and other coastal spots",
          type: "Leisure",
        },
      ],
      estimatedTotalCost: "₹50,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Gateway+of+India",
        alt: "Gateway of India, Mumbai",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Marine+Drive",
        alt: "Marine Drive at night, Mumbai",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Elephanta+Caves",
        alt: "Elephanta Caves",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Mumbai+Street+Food",
        alt: "Famous Mumbai street food",
      },
    ],
  },
  Varanasi: {
    destination: "Varanasi",
    data: {
      tripSummary: {
        destination: "Varanasi",
        duration: 3,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹2,500-5,000 per day",
        travelGroup: "solo",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights to Varanasi from major Indian cities",
            estimatedCost: "₹5,000 - ₹10,000",
          },
          {
            type: "Train",
            details: "Well-connected by railways to most cities",
            estimatedCost: "₹800 - ₹2,000",
          },
        ],
        localOptions: [
          {
            type: "Auto Rickshaw",
            details: "Common mode of transport within the city",
            estimatedCost: "₹30-150 per trip",
          },
          {
            type: "Cycle Rickshaw",
            details: "Good for navigating narrow lanes",
            estimatedCost: "₹20-100 per trip",
          },
          {
            type: "Boat Ride",
            details: "Essential experience on the Ganges",
            estimatedCost: "₹500-1,000 per hour",
          },
        ],
      },
      accommodation: [
        {
          name: "Riverside Guesthouse",
          description: "Traditional accommodation with Ganges views",
          priceRange: "₹1,500-3,000 per night",
          location: "Assi Ghat",
        },
        {
          name: "Heritage Hotel",
          description: "Converted haveli with modern amenities",
          priceRange: "₹3,000-6,000 per night",
          location: "Near Dashashwamedh Ghat",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Sunrise Boat Ride on the Ganges",
            location: "Assi Ghat to Manikarnika Ghat",
            details: "Experience the spiritual awakening of the city from the river",
            estimatedCost: "₹600 (private boat for 1 hour)",
          },
          lunch: {
            recommendation: "Aadha-Aadha",
            cuisine: "North Indian and Continental",
            priceRange: "₹400-700",
            location: "Assi Ghat",
          },
          afternoon: {
            activity: "Walking Tour of Ghats",
            location: "Main Ghats",
            details: "Explore the various ghats and their unique characteristics",
            estimatedCost: "₹500 (guided tour)",
          },
          dinner: {
            recommendation: "Varanasi Cafe",
            cuisine: "Traditional Banarasi",
            priceRange: "₹300-600",
            location: "Near Dashashwamedh Ghat",
          },
          evening: {
            activity: "Ganga Aarti Ceremony",
            location: "Dashashwamedh Ghat",
            details: "Witness the spectacular evening prayer ceremony",
            estimatedCost: "Free (₹200 for good viewing spot)",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Sarnath Excursion",
            location: "Sarnath",
            details: "Visit the site where Buddha gave his first sermon",
            estimatedCost: "₹800 (transportation and entry fees)",
          },
          lunch: {
            recommendation: "Sarnath Garden Restaurant",
            cuisine: "Vegetarian Indian",
            priceRange: "₹300-500",
            location: "Sarnath",
          },
          afternoon: {
            activity: "Sarnath Museum and Dhamek Stupa",
            location: "Sarnath",
            details: "Explore Buddhist artifacts and the ancient stupa",
            estimatedCost: "₹300 (entry fees)",
          },
          dinner: {
            recommendation: "Pizzeria Vaatika Cafe",
            cuisine: "Italian and Indian",
            priceRange: "₹500-800",
            location: "Assi Ghat",
          },
          evening: {
            activity: "Classical Music Performance",
            location: "International Music Centre Ashram",
            details: "Enjoy traditional Indian classical music",
            estimatedCost: "₹500 (donation)",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Kashi Vishwanath Temple Visit",
            location: "Vishwanath Gali",
            details: "Visit one of the most sacred Hindu temples",
            estimatedCost: "Free (₹100 for offerings)",
          },
          lunch: {
            recommendation: "Kashi Chat Bhandar",
            cuisine: "Banarasi Street Food",
            priceRange: "₹200-400",
            location: "Godowlia",
          },
          afternoon: {
            activity: "Old City Lanes and Silk Shopping",
            location: "Vishwanath Gali and Chowk",
            details: "Explore the narrow lanes and shop for famous Banarasi silk",
            estimatedCost: "₹1,000-3,000 (shopping)",
          },
          dinner: {
            recommendation: "Bati Chokha",
            cuisine: "Traditional Bihari",
            priceRange: "₹400-700",
            location: "Lanka",
          },
          evening: {
            activity: "Evening Boat Ride and Floating Candles",
            location: "Main Ghats",
            details: "Experience the spiritual ambiance of the river at night",
            estimatedCost: "₹700 (boat ride and candle offerings)",
          },
        },
      ],
      highlights: [
        {
          name: "Spiritual Experience",
          description: "One of the world's oldest continuously inhabited cities and Hinduism's holiest site",
          type: "Cultural",
        },
        {
          name: "Ghats of Varanasi",
          description: "The 88 ghats lining the Ganges River, each with its own significance",
          type: "Spiritual",
        },
        {
          name: "Banarasi Silk",
          description: "World-famous handloom sarees and textiles",
          type: "Shopping",
        },
        {
          name: "Banarasi Cuisine",
          description: "Unique local delicacies like Banarasi Paan, Thandai, and Malaiyo",
          type: "Culinary",
        },
      ],
      estimatedTotalCost: "₹20,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Varanasi+Ghats",
        alt: "Ghats of Varanasi at sunrise",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Ganga+Aarti",
        alt: "Evening Ganga Aarti ceremony",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Sarnath",
        alt: "Dhamek Stupa at Sarnath",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Banarasi+Silk",
        alt: "Traditional Banarasi silk sarees",
      },
    ],
  },
  Kerala: {
    destination: "Kerala",
    data: {
      tripSummary: {
        destination: "Kerala",
        duration: 5,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "₹4,000-8,000 per day",
        travelGroup: "couple",
      },
      transportation: {
        toDestination: [
          {
            type: "Flight",
            details: "Direct flights to Kochi from major Indian cities",
            estimatedCost: "₹5,000 - ₹12,000",
          },
          {
            type: "Train",
            details: "Well-connected by railways to most cities",
            estimatedCost: "₹1,000 - ₹3,000",
          },
        ],
        localOptions: [
          {
            type: "Private Car Rental",
            details: "Best for traveling between destinations",
            estimatedCost: "₹2,500-3,500 per day",
          },
          {
            type: "Auto Rickshaw",
            details: "Good for local sightseeing",
            estimatedCost: "₹30-150 per trip",
          },
          {
            type: "Boat/Ferry",
            details: "Essential for backwater areas",
            estimatedCost: "₹100-500 per trip",
          },
        ],
      },
      accommodation: [
        {
          name: "Heritage Hotel in Fort Kochi",
          description: "Colonial-era building with modern amenities",
          priceRange: "₹4,000-7,000 per night",
          location: "Fort Kochi",
        },
        {
          name: "Houseboat in Alleppey",
          description: "Traditional Kerala houseboat with crew",
          priceRange: "₹6,000-12,000 per night",
          location: "Alleppey Backwaters",
        },
        {
          name: "Eco Resort in Munnar",
          description: "Sustainable accommodation amidst tea plantations",
          priceRange: "₹5,000-9,000 per night",
          location: "Munnar Hills",
        },
      ],
      itinerary: [
        {
          day: 1,
          date: new Date().toISOString().split("T")[0],
          morning: {
            activity: "Fort Kochi Exploration",
            location: "Fort Kochi",
            details: "Visit Chinese Fishing Nets, St. Francis Church, and Dutch Palace",
            estimatedCost: "₹500 (entry fees and transportation)",
          },
          lunch: {
            recommendation: "Kashi Art Cafe",
            cuisine: "Continental and Kerala Fusion",
            priceRange: "₹600-1,000",
            location: "Fort Kochi",
          },
          afternoon: {
            activity: "Jew Town and Mattancherry",
            location: "Mattancherry",
            details: "Explore the historic Jewish quarter and spice markets",
            estimatedCost: "₹300 (transportation and small purchases)",
          },
          dinner: {
            recommendation: "Fort House Restaurant",
            cuisine: "Kerala Seafood",
            priceRange: "₹1,000-1,500",
            location: "Fort Kochi",
          },
          evening: {
            activity: "Kathakali Performance",
            location: "Kerala Kathakali Centre",
            details: "Watch the traditional dance-drama of Kerala",
            estimatedCost: "₹350 per person (tickets)",
          },
        },
        {
          day: 2,
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Drive to Munnar",
            location: "Kochi to Munnar",
            details: "Scenic drive through the Western Ghats",
            estimatedCost: "₹3,000 (car rental)",
          },
          lunch: {
            recommendation: "Saravana Bhavan",
            cuisine: "South Indian",
            priceRange: "₹400-700",
            location: "En route to Munnar",
          },
          afternoon: {
            activity: "Tea Plantation Visit",
            location: "Munnar",
            details: "Tour a tea estate and learn about tea production",
            estimatedCost: "₹500 (entry and guided tour)",
          },
          dinner: {
            recommendation: "Rapsy Restaurant",
            cuisine: "Kerala and North Indian",
            priceRange: "₹800-1,200",
            location: "Munnar Town",
          },
          evening: {
            activity: "Relaxation at Resort",
            location: "Munnar",
            details: "Enjoy the cool climate and mountain views",
            estimatedCost: "Included with accommodation",
          },
        },
        {
          day: 3,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Eravikulam National Park",
            location: "Near Munnar",
            details: "Spot the endangered Nilgiri Tahr and enjoy panoramic views",
            estimatedCost: "₹400 (entry fees)",
          },
          lunch: {
            recommendation: "SN Restaurant",
            cuisine: "Kerala",
            priceRange: "₹500-800",
            location: "Munnar",
          },
          afternoon: {
            activity: "Mattupetty Dam and Echo Point",
            location: "Munnar",
            details: "Enjoy boating and the scenic beauty",
            estimatedCost: "₹600 (entry and boating)",
          },
          dinner: {
            recommendation: "Eastend Restaurant",
            cuisine: "Multi-cuisine",
            priceRange: "₹900-1,300",
            location: "Munnar",
          },
          evening: {
            activity: "Kalaripayattu Martial Arts Show",
            location: "Munnar Cultural Centre",
            details: "Watch Kerala's traditional martial art form",
            estimatedCost: "₹300 per person (tickets)",
          },
        },
        {
          day: 4,
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Drive to Alleppey",
            location: "Munnar to Alleppey",
            details: "Journey from the hills to the backwaters",
            estimatedCost: "₹3,500 (car rental)",
          },
          lunch: {
            recommendation: "Thaff Restaurant",
            cuisine: "Kerala",
            priceRange: "₹500-800",
            location: "En route to Alleppey",
          },
          afternoon: {
            activity: "Houseboat Check-in and Cruise",
            location: "Alleppey Backwaters",
            details: "Begin your backwater cruise on a traditional houseboat",
            estimatedCost: "Included with houseboat rental",
          },
          dinner: {
            recommendation: "Onboard Houseboat Dining",
            cuisine: "Fresh Kerala Seafood",
            priceRange: "Included with houseboat",
            location: "Alleppey Backwaters",
          },
          evening: {
            activity: "Sunset on the Backwaters",
            location: "Alleppey Backwaters",
            details: "Enjoy the peaceful sunset from your houseboat",
            estimatedCost: "Included with houseboat rental",
          },
        },
        {
          day: 5,
          date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          morning: {
            activity: "Houseboat Breakfast and Checkout",
            location: "Alleppey Backwaters",
            details: "Enjoy a traditional Kerala breakfast before disembarking",
            estimatedCost: "Included with houseboat rental",
          },
          lunch: {
            recommendation: "Tharavadu Family Restaurant",
            cuisine: "Traditional Kerala",
            priceRange: "₹600-900",
            location: "Alleppey Town",
          },
          afternoon: {
            activity: "Marari Beach",
            location: "Near Alleppey",
            details: "Relax at this pristine beach before departure",
            estimatedCost: "₹300 (transportation)",
          },
          dinner: {
            recommendation: "Chakara Restaurant",
            cuisine: "Seafood",
            priceRange: "₹1,000-1,500",
            location: "Marari Beach",
          },
          evening: {
            activity: "Return to Kochi",
            location: "Alleppey to Kochi",
            details: "Drive back to Kochi for departure",
            estimatedCost: "₹2,000 (car rental)",
          },
        },
      ],
      highlights: [
        {
          name: "Kerala Backwaters",
          description: "Network of lagoons, lakes, and canals parallel to the Arabian Sea coast",
          type: "Natural Beauty",
        },
        {
          name: "Tea Plantations",
          description: "Lush green tea estates covering the hills of Munnar",
          type: "Landscape",
        },
        {
          name: "Kerala Cuisine",
          description: "Coconut-based dishes, seafood, and unique spice combinations",
          type: "Culinary",
        },
        {
          name: "Traditional Arts",
          description: "Kathakali, Mohiniyattam, and Kalaripayattu performances",
          type: "Cultural",
        },
      ],
      estimatedTotalCost: "₹70,000",
    },
    images: [
      {
        url: "/placeholder.svg?height=400&width=600&text=Kerala+Backwaters",
        alt: "Houseboats on Kerala backwaters",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Munnar+Tea+Plantations",
        alt: "Lush tea plantations in Munnar",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Fort+Kochi",
        alt: "Chinese fishing nets in Fort Kochi",
      },
      {
        url: "/placeholder.svg?height=400&width=600&text=Kerala+Cuisine",
        alt: "Traditional Kerala sadya (feast)",
      },
    ],
  },
}
