"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "../contexts/AppContext"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Advice() {
  const { userInfo, nutritionPlan, loading } = useAppContext()

  if (!userInfo && !nutritionPlan && !loading) {
    return null
  }

  const getActivityAdvice = () => {
    if (!userInfo) return ""
    switch (userInfo.activityLevel) {
      case "sedentary":
        return "Try to incorporate more movement into your day. Start with short walks or stretching sessions."
      case "light":
        return "Consider adding some strength training to your routine. Bodyweight exercises are a great start."
      case "moderate":
        return "You're doing great! Mix up your routine with different types of exercises to keep challenging yourself."
      case "very":
        return "Make sure you're allowing enough time for recovery between intense workouts."
      case "extra":
        return "Your activity level is high. Ensure you're fueling your body properly and getting enough rest."
      default:
        return "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week."
    }
  }

  const getWeightAdvice = () => {
    if (!userInfo) return ""
    switch (userInfo.goal) {
      case "lose":
        return "Focus on creating a slight calorie deficit through diet and exercise. Aim for a gradual weight loss of 0.5-1 kg per week."
      case "maintain":
        return "Keep your calorie intake consistent with your expenditure. Regular exercise will help maintain your current weight."
      case "gain":
        return "Increase your calorie intake gradually and focus on strength training to build muscle mass."
      default:
        return "Maintain a balanced diet and regular exercise routine to support your overall health."
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle as="h3" className="text-2xl font-bold">
          Personalized Advice
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="activity">
              <AccordionTrigger>Activity Advice</AccordionTrigger>
              <AccordionContent>{getActivityAdvice()}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="weight">
              <AccordionTrigger>Weight Management Advice</AccordionTrigger>
              <AccordionContent>{getWeightAdvice()}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="general">
              <AccordionTrigger>General Health Tips</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Aim to drink at least 8 glasses of water daily to stay hydrated.</li>
                  <li>
                    Include a variety of colorful fruits and vegetables in your diet to ensure you're getting a wide
                    range of nutrients.
                  </li>
                  <li>Get 7-9 hours of sleep each night to support your overall health and fitness goals.</li>
                  <li>Practice stress-reduction techniques like meditation or deep breathing exercises.</li>
                  <li>Limit processed foods and focus on whole, nutrient-dense options.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

