import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ItineraryNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Itinerary Not Found</h1>
        <p className="text-gray-300 mb-8">
          We couldn't find the itinerary you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trip Planner
          </Button>
        </Link>
      </div>
    </main>
  )
}
