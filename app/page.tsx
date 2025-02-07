"use client"

import React, { Suspense, lazy } from "react"
import { AppProvider } from "./contexts/AppContext"
import UserInputForm from "./components/UserInputForm"
import LoadingOverlay from "./components/LoadingOverlay"
import { useAppContext } from "./contexts/AppContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MealPlan = lazy(() => import("./components/MealPlan"))
const NutritionPlan = lazy(() => import("./components/NutritionPlan"))
const GroceryList = lazy(() => import("./components/GroceryList"))
const Advice = lazy(() => import("./components/Advice"))
const DownloadPlan = lazy(() => import("./components/DownloadPlan"))

function AppContent() {
  const { loading, userInfo } = useAppContext()

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Nutrition Meal Planner</h1>
      <p className="text-center text-base md:text-lg mb-8 text-muted-foreground">
        Get personalized meal plans and nutrition advice based on your goals
      </p>
      <UserInputForm />
      {loading && <LoadingOverlay />}
      {userInfo && (
        <div className="mt-8">
          <Tabs defaultValue="meal-plan" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
              <TabsTrigger value="nutrition-plan">Nutrition Plan</TabsTrigger>
              <TabsTrigger value="grocery-list">Grocery List</TabsTrigger>
              <TabsTrigger value="advice">Advice</TabsTrigger>
              <TabsTrigger value="download" className="hidden lg:block">
                Download Plan
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <Suspense fallback={<LoadingOverlay />}>
                <TabsContent value="meal-plan">
                  <MealPlan />
                </TabsContent>
                <TabsContent value="nutrition-plan">
                  <NutritionPlan />
                </TabsContent>
                <TabsContent value="grocery-list">
                  <GroceryList />
                </TabsContent>
                <TabsContent value="advice">
                  <Advice />
                </TabsContent>
                <TabsContent value="download">
                  <DownloadPlan />
                </TabsContent>
              </Suspense>
            </div>
          </Tabs>
          <div className="mt-8 flex justify-center lg:hidden">
            <DownloadPlan />
          </div>
        </div>
      )}
    </main>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

