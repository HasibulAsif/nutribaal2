"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useAppContext } from "../contexts/AppContext"

export default function ExportPlan() {
  const { userInfo, nutritionPlan, mealPlan, groceryList } = useAppContext()
  const [loading, setLoading] = useState(false)

  const exportPlan = () => {
    setLoading(true)
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
    setLoading(false)
  }

  if (!userInfo || !nutritionPlan || !mealPlan || !groceryList) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Your Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={exportPlan} disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Exporting..." : "Export Plan"}
        </Button>
      </CardContent>
    </Card>
  )
}

