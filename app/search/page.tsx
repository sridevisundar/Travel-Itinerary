import { TransportationSearch } from "@/components/transportation-search"
import { HotelSearch } from "@/components/hotel-search"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Planner
            </Button>
          </Link>

          <Logo />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransportationSearch />
          <HotelSearch />
        </div>
      </div>
    </main>
  )
}
