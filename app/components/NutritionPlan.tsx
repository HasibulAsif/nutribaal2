"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "../contexts/AppContext"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import React, { useMemo } from "react"

const NutritionPlan = React.memo(function NutritionPlan() {
  const { nutritionPlan, loading } = useAppContext()

  const chartData = useMemo(() => {
    if (!nutritionPlan) return []
    return [
      {
        name: "Current",
        calories: nutritionPlan.calories,
        protein: nutritionPlan.protein,
        carbs: nutritionPlan.carbs,
        fat: nutritionPlan.fat,
      },
      {
        name: "Goal",
        calories: nutritionPlan.calories * 0.9,
        protein: nutritionPlan.protein * 1.1,
        carbs: nutritionPlan.carbs * 0.9,
        fat: nutritionPlan.fat * 0.9,
      },
    ]
  }, [nutritionPlan])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle as="h3" className="text-2xl font-bold">
          Your Nutrition Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                  <Line type="monotone" dataKey="protein" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="carbs" stroke="#ffc658" />
                  <Line type="monotone" dataKey="fat" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="text-base">
                <strong>Daily Calories:</strong> {nutritionPlan?.calories} kcal
              </li>
              <li className="text-base">
                <strong>Protein:</strong> {nutritionPlan?.protein}g
              </li>
              <li className="text-base">
                <strong>Carbohydrates:</strong> {nutritionPlan?.carbs}g
              </li>
              <li className="text-base">
                <strong>Fat:</strong> {nutritionPlan?.fat}g
              </li>
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  )
})

export default NutritionPlan

