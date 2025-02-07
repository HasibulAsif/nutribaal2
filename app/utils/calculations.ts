export const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }
}

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
  }
  return bmr * activityMultipliers[activityLevel]
}

export const calculateMacros = (tdee: number, goal: string): { protein: number; carbs: number; fat: number } => {
  let proteinPercentage, carbsPercentage, fatPercentage

  switch (goal) {
    case "lose":
      proteinPercentage = 0.4
      carbsPercentage = 0.3
      fatPercentage = 0.3
      tdee *= 0.85 // 15% calorie deficit
      break
    case "gain":
      proteinPercentage = 0.3
      carbsPercentage = 0.5
      fatPercentage = 0.2
      tdee *= 1.15 // 15% calorie surplus
      break
    default: // maintain
      proteinPercentage = 0.3
      carbsPercentage = 0.4
      fatPercentage = 0.3
  }

  return {
    protein: Math.round((tdee * proteinPercentage) / 4), // 4 calories per gram of protein
    carbs: Math.round((tdee * carbsPercentage) / 4), // 4 calories per gram of carbs
    fat: Math.round((tdee * fatPercentage) / 9), // 9 calories per gram of fat
  }
}

