"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MealPlanner() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [meals, setMeals] = useState<{ [key: string]: string[] }>({})

  const addMeal = (mealType: string) => {
    const newMeal = prompt(`Enter a new ${mealType}:`)
    if (newMeal) {
      setMeals((prevMeals) => ({
        ...prevMeals,
        [date!.toDateString()]: [...(prevMeals[date!.toDateString()] || []), `${mealType}: ${newMeal}`],
      }))
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Meal Planner</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Meals for {date?.toDateString()}</h3>
          <div className="space-y-2">
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => (
              <div key={mealType} className="flex items-center justify-between">
                <span>{mealType}</span>
                <Button variant="outline" size="sm" onClick={() => addMeal(mealType)}>
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {meals[date?.toDateString()]?.map((meal, index) => (
              <li key={index} className="bg-secondary p-2 rounded-md">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

