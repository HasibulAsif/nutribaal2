"use client"

import { Menu, User, ShoppingCart, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            NutriPlan Pro
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost">Meal Plan</Button>
            </li>
            <li>
              <Button variant="ghost">Recipes</Button>
            </li>
            <li>
              <Button variant="ghost">Nutrition</Button>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </header>
  )
}

