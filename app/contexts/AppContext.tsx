"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserInfo = {
  age: number
  gender: string
  height: number
  weight: number
  activityLevel: string
  goal: string
}

type AppContextType = {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
  mealPlan: any
  setMealPlan: (plan: any) => void
  nutritionPlan: any
  setNutritionPlan: (plan: any) => void
  groceryList: string[]
  setGroceryList: (list: string[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [nutritionPlan, setNutritionPlan] = useState<any>(null)
  const [groceryList, setGroceryList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        mealPlan,
        setMealPlan,
        nutritionPlan,
        setNutritionPlan,
        groceryList,
        setGroceryList,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

