"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppContext } from "../contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

export default function GroceryList() {
  const { groceryList, loading } = useAppContext()
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState("")

  if (!groceryList && !loading) {
    return null
  }

  const toggleItem = (item: string) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item)
    } else {
      newCheckedItems.add(item)
    }
    setCheckedItems(newCheckedItems)
  }

  const clearCheckedItems = () => {
    setCheckedItems(new Set())
  }

  const filteredList = groceryList?.filter((item) => item.toLowerCase().includes(filter.toLowerCase()))

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle as="h3" className="text-2xl font-bold">
          Your Grocery List
        </CardTitle>
        <Button variant="outline" size="sm" onClick={clearCheckedItems}>
          Clear Checked
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Filter items..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full"
          />
        </div>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {filteredList &&
              filteredList.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`item-${index}`}
                    checked={checkedItems.has(item)}
                    onCheckedChange={() => toggleItem(item)}
                  />
                  <label
                    htmlFor={`item-${index}`}
                    className={`flex-grow ${checkedItems.has(item) ? "line-through text-muted-foreground" : ""}`}
                  >
                    {item}
                  </label>
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

