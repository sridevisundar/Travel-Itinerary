import { Plane } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-purple-600 p-2 rounded-full">
        <Plane className="h-6 w-6 text-white transform -rotate-45" />
      </div>
    </div>
  )
}
