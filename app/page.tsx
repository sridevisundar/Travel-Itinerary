import { TripPlannerForm } from "@/components/trip-planner-form"
import { DestinationSelector } from "@/components/destination-selector"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Logo className="inline-block mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Nyx - The Travel Planner</h1>
          <p className="text-gray-300">Tell us your travel preferences — we'll design your perfect Indian adventure</p>
        </div>

        <div className="space-y-6">
          <DestinationSelector />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
          </div>
          <TripPlannerForm />
        </div>
      </div>
    </main>
  )
}
