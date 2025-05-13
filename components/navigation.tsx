"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Plane, Building, Calendar } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 md:relative md:bg-transparent md:border-none md:p-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="hidden md:block">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="flex justify-around w-full md:justify-end md:gap-2">
          <Link href="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              className={`flex flex-col items-center gap-1 h-auto py-2 ${isActive("/") ? "bg-purple-700 text-white" : "text-gray-300"}`}
              size="sm"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Plan</span>
            </Button>
          </Link>

          <Link href="/search">
            <Button
              variant={isActive("/search") ? "default" : "ghost"}
              className={`flex flex-col items-center gap-1 h-auto py-2 ${isActive("/search") ? "bg-purple-700 text-white" : "text-gray-300"}`}
              size="sm"
            >
              <Plane className="h-5 w-5" />
              <span className="text-xs">Travel</span>
            </Button>
          </Link>

          <Link href="/hotels">
            <Button
              variant={isActive("/hotels") ? "default" : "ghost"}
              className={`flex flex-col items-center gap-1 h-auto py-2 ${isActive("/hotels") ? "bg-purple-700 text-white" : "text-gray-300"}`}
              size="sm"
            >
              <Building className="h-5 w-5" />
              <span className="text-xs">Hotels</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
