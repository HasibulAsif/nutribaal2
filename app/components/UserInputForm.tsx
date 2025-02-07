"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "../contexts/AppContext"
import { calculateBMR, calculateTDEE, calculateMacros } from "../utils/calculations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const formSchema = z
  .object({
    age: z.number().min(18, "Age must be at least 18").max(120, "Age must be less than 120"),
    gender: z.enum(["male", "female", "other"]),
    heightUnit: z.enum(["cm", "ft-in"]),
    heightCm: z
      .number()
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be less than 250 cm")
      .optional(),
    heightFt: z.number().min(3, "Height must be at least 3 ft").max(8, "Height must be less than 8 ft").optional(),
    heightIn: z
      .number()
      .min(0, "Inches must be between 0 and 11")
      .max(11, "Inches must be between 0 and 11")
      .optional(),
    weight: z.number().min(30, "Weight must be at least 30 kg").max(300, "Weight must be less than 300 kg"),
    activityLevel: z.enum(["sedentary", "light", "moderate", "very", "extra"]),
    goal: z.enum(["lose", "maintain", "gain"]),
  })
  .refine(
    (data) => {
      if (data.heightUnit === "cm") {
        return data.heightCm !== undefined
      } else {
        return data.heightFt !== undefined
      }
    },
    {
      message: "Height is required",
      path: ["heightCm"],
    },
  )

export default function UserInputForm() {
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft-in">("cm")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      heightUnit: "cm",
      heightCm: undefined,
      heightFt: undefined,
      heightIn: undefined,
      weight: undefined,
      activityLevel: undefined,
      goal: undefined,
    },
  })

  const { toast } = useToast()
  const { setUserInfo: setContextUserInfo, setNutritionPlan, setLoading } = useAppContext()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      let heightInCm: number
      if (data.heightUnit === "cm") {
        heightInCm = data.heightCm!
      } else {
        heightInCm = data.heightFt! * 30.48 + data.heightIn! * 2.54
      }

      const userInfo = {
        ...data,
        height: heightInCm,
      }

      setContextUserInfo(userInfo)

      const bmr = calculateBMR(data.weight, heightInCm, data.age, data.gender)
      const tdee = calculateTDEE(bmr, data.activityLevel)
      const macros = calculateMacros(tdee, data.goal)

      setNutritionPlan({
        calories: Math.round(tdee),
        ...macros,
      })

      toast({
        title: "Information Submitted",
        description: "Your personalized plan is being generated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error generating your plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle as="h2" className="text-2xl font-bold">
          Enter Your Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                        value={field.value ?? ""}
                        placeholder="Enter your age"
                      />
                    </FormControl>
                    <FormDescription>Your age in years</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your gender</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="heightUnit"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Height Unit</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value: "cm" | "ft-in") => {
                            field.onChange(value)
                            setHeightUnit(value)
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cm" />
                            </FormControl>
                            <FormLabel className="font-normal">Centimeters (cm)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ft-in" />
                            </FormControl>
                            <FormLabel className="font-normal">Feet and Inches (ft-in)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {heightUnit === "cm" ? (
                <FormField
                  control={form.control}
                  name="heightCm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                          value={field.value ?? ""}
                          placeholder="Enter your height"
                        />
                      </FormControl>
                      <FormDescription>Your height in centimeters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="heightFt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (ft)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                            value={field.value ?? ""}
                            placeholder="Feet"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heightIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (in)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                            value={field.value ?? ""}
                            placeholder="Inches"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                        value={field.value ?? ""}
                        placeholder="Enter your weight"
                      />
                    </FormControl>
                    <FormDescription>Your weight in kilograms</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Lightly Active</SelectItem>
                        <SelectItem value="moderate">Moderately Active</SelectItem>
                        <SelectItem value="very">Very Active</SelectItem>
                        <SelectItem value="extra">Extra Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose your typical activity level</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lose">Lose Weight</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="gain">Gain Weight</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your fitness goal</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Generate Plan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

