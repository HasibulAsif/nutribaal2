"use client"

import React, { useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon as Refresh } from "lucide-react"
import { useAppContext } from "../contexts/AppContext"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mealOptions = {
  breakfast: [
    "Oatmeal with berries and nuts",
    "Greek yogurt with honey and granola",
    "Whole grain toast with avocado and eggs",
    "Protein smoothie with spinach and banana",
    "Breakfast burrito with eggs, beans, and vegetables",
  ],
  lunch: [
    "Grilled chicken salad with mixed vegetables",
    "Tuna sandwich on whole grain bread",
    "Quinoa bowl with roasted vegetables and chickpeas",
    "Turkey and vegetable wrap",
    "Lentil soup with a side salad",
  ],
  dinner: [
    "Baked salmon with quinoa and steamed broccoli",
    "Stir-fry tofu with mixed vegetables and brown rice",
    "Lean beef steak with sweet potato and green beans",
    "Grilled chicken breast with roasted vegetables",
    "Vegetarian chili with cornbread",
  ],
  snacks: [
    "Apple slices with almond butter",
    "Carrot sticks with hummus",
    "Hard-boiled eggs",
    "Mixed nuts and dried fruits",
    "Cottage cheese with pineapple",
  ],
}

const MealPlan = React.memo(function MealPlan() {
  const { nutritionPlan, mealPlan, setMealPlan, setGroceryList, loading, setLoading } = useAppContext()

  const generateMealPlan = useCallback(() => {
    if (nutritionPlan) {
      setLoading(true)
      setTimeout(() => {
        const newMealPlan = {
          breakfast: mealOptions.breakfast[Math.floor(Math.random() * mealOptions.breakfast.length)],
          lunch: mealOptions.lunch[Math.floor(Math.random() * mealOptions.lunch.length)],
          dinner: mealOptions.dinner[Math.floor(Math.random() * mealOptions.dinner.length)],
          snacks: [
            mealOptions.snacks[Math.floor(Math.random() * mealOptions.snacks.length)],
            mealOptions.snacks[Math.floor(Math.random() * mealOptions.snacks.length)],
          ],
        }
        setMealPlan(newMealPlan)

        // Generate grocery list
        const groceryList = new Set<string>()
        Object.values(newMealPlan)
          .flat()
          .forEach((meal) => {
            meal.split(" ").forEach((word) => groceryList.add(word))
          })
        setGroceryList(Array.from(groceryList))
        setLoading(false)
      }, 500)
    }
  }, [nutritionPlan, setMealPlan, setGroceryList, setLoading])

  useEffect(() => {
    if (nutritionPlan && !mealPlan) {
      generateMealPlan()
    }
  }, [nutritionPlan, mealPlan, generateMealPlan])

  if (!mealPlan) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle as="h3" className="text-2xl font-bold">
          Your Meal Plan
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={generateMealPlan}
          disabled={loading}
          aria-label="Regenerate meal plan"
        >
          <Refresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
          </TabsList>
          {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
            <TabsContent key={mealType} value={mealType}>
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold mb-2 capitalize text-lg">{mealType}</h4>
                {loading ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <p className="text-base">
                    {Array.isArray(mealPlan[mealType]) ? mealPlan[mealType].join(", ") : mealPlan[mealType]}
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
})

export default MealPlan

