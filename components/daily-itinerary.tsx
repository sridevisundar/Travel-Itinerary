"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Sun, Utensils, Moon, MapPin, DollarSign } from "lucide-react"

interface Activity {
  activity: string
  location: string
  details: string
  estimatedCost: string
}

interface Meal {
  recommendation: string
  cuisine: string
  priceRange: string
  location: string
}

interface DayItinerary {
  day: number
  date: string
  morning: Activity
  lunch: Meal
  afternoon: Activity
  dinner: Meal
  evening: Activity
}

interface DailyItineraryProps {
  itinerary: DayItinerary[]
}

export function DailyItinerary({ itinerary }: DailyItineraryProps) {
  const [activeTab, setActiveTab] = useState(`day-1`)

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Daily Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-700/50 mb-4 overflow-x-auto flex-nowrap w-full">
            {itinerary.map((day) => (
              <TabsTrigger key={`day-${day.day}`} value={`day-${day.day}`} className="flex-shrink-0">
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {itinerary.map((day) => (
            <TabsContent key={`day-${day.day}`} value={`day-${day.day}`} className="space-y-4">
              <div className="text-white font-medium">{formatDate(day.date)}</div>

              <div className="space-y-4">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium text-white">Morning</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white">{day.morning.activity}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-300 mt-1">
                        <MapPin className="h-4 w-4 text-purple-300" />
                        {day.morning.location}
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{day.morning.details}</p>
                      <div className="text-sm font-medium text-purple-300 mt-2 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {day.morning.estimatedCost}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium text-white">Lunch</h3>
                  </div>

                  <div>
                    <h4 className="font-medium text-white">{day.lunch.recommendation}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-300 mt-1">
                      <MapPin className="h-4 w-4 text-purple-300" />
                      {day.lunch.location}
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-gray-300">Cuisine: {day.lunch.cuisine}</div>
                      <div className="text-sm font-medium text-purple-300 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {day.lunch.priceRange}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium text-white">Afternoon</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white">{day.afternoon.activity}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-300 mt-1">
                        <MapPin className="h-4 w-4 text-purple-300" />
                        {day.afternoon.location}
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{day.afternoon.details}</p>
                      <div className="text-sm font-medium text-purple-300 mt-2 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {day.afternoon.estimatedCost}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium text-white">Dinner</h3>
                  </div>

                  <div>
                    <h4 className="font-medium text-white">{day.dinner.recommendation}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-300 mt-1">
                      <MapPin className="h-4 w-4 text-purple-300" />
                      {day.dinner.location}
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-gray-300">Cuisine: {day.dinner.cuisine}</div>
                      <div className="text-sm font-medium text-purple-300 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {day.dinner.priceRange}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Moon className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium text-white">Evening</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white">{day.evening.activity}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-300 mt-1">
                        <MapPin className="h-4 w-4 text-purple-300" />
                        {day.evening.location}
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{day.evening.details}</p>
                      <div className="text-sm font-medium text-purple-300 mt-2 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {day.evening.estimatedCost}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
