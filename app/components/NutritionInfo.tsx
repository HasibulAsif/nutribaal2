"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function NutritionInfo() {
  const data = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        hoverBackgroundColor: ["#2563EB", "#059669", "#D97706"],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm">Calories: 2000</p>
          <p className="text-sm">Protein: 150g</p>
          <p className="text-sm">Carbs: 250g</p>
          <p className="text-sm">Fat: 44g</p>
        </div>
      </CardContent>
    </Card>
  )
}

