"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useAppContext } from "../contexts/AppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DownloadPlan() {
  const { userInfo, nutritionPlan, mealPlan, groceryList } = useAppContext()

  const handleDownload = () => {
    const plan = {
      userInfo,
      nutritionPlan,
      mealPlan,
      groceryList,
    }

    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "nutrition_plan.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!userInfo || !nutritionPlan || !mealPlan || !groceryList) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle as="h3" className="text-2xl font-bold">
          Download Your Plan
        </CardTitle>
        <CardDescription>Save your personalized nutrition and meal plan for offline use</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Plan
        </Button>
      </CardContent>
    </Card>
  )
}

