export interface NutritionParams {
  gender: "female" | "male";
  age: number;
  height: number;
  weight: number;
  activityLevel: number;
  goal: "LOSE" | "MAINTAIN" | "GAIN";
}

export interface CalculatedNutrition {
  targetCalories: number;
  targetProteins: number;
  targetFats: number;
  targetCarbs: number;
}

/**
 * AuthorizedUser.calculateBMR(): Float
 * Базовий метаболізм за формулою Маффіна-Джеора
 */
export function calculateBMR(params: Pick<NutritionParams, "gender" | "age" | "height" | "weight">): number {
  const { gender, age, height, weight } = params;
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? bmr + 5 : bmr - 161;
}

/**
 * AuthorizedUser.calculateTDEE(): Float
 * Загальні добові витрати енергії з урахуванням активності та мети
 */
export function calculateTDEE(params: NutritionParams): number {
  const bmr = calculateBMR(params);
  let tdee = bmr * params.activityLevel;

  if (params.goal === "LOSE") {
    tdee -= 300;
  } else if (params.goal === "GAIN") {
    tdee += 300;
  }

  return Math.round(tdee);
}

/**
 * Повний розрахунок добової норми КБЖВ для користувача
 */
export function calculateTargetNutrition(params: NutritionParams): CalculatedNutrition {
  const targetCalories = calculateTDEE(params);

  // Розподіл БЖВ (30% Білки, 30% Жири, 40% Вуглеводи)
  const targetProteins = Math.round((targetCalories * 0.3) / 4);
  const targetFats = Math.round((targetCalories * 0.3) / 9);
  const targetCarbs = Math.round((targetCalories * 0.4) / 4);

  return {
    targetCalories,
    targetProteins,
    targetFats,
    targetCarbs,
  };
}
