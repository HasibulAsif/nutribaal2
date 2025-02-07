"use client"

import { User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    goal: "Lose weight",
    height: 180,
    weight: 75,
    bmi: 23.1,
    dailyCalories: 2000,
  })

  const handleEdit = () => {
    if (isEditing) {
      // Here you would typically send the updated profile to a backend API
      console.log("Saving profile:", profile)
    }
    setIsEditing(!isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Goal: {profile.goal}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleEdit}>
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(profile).map(
            ([key, value]) =>
              key !== "name" &&
              key !== "goal" && (
                <div key={key} className="bg-secondary rounded-lg p-4">
                  <h3 className="text-lg font-medium capitalize">{key}</h3>
                  {isEditing ? (
                    <Input type="text" name={key} value={value} onChange={handleChange} className="mt-1" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {value}{" "}
                      {key === "height" ? "cm" : key === "weight" ? "kg" : key === "dailyCalories" ? "kcal" : ""}
                    </p>
                  )}
                </div>
              ),
          )}
        </div>
      </CardContent>
    </Card>
  )
}

