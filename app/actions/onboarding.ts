"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  calculateTargetNutrition,
  NutritionParams,
} from "@/lib/nutrition";

export async function saveOnboardingData(data: NutritionParams) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { error: "Користувач не авторизований" };
  }

  // Розрахунок BMR -> TDEE -> КБЖВ згідно з методами класу AuthorizedUser
  const nutritionResults = calculateTargetNutrition(data);

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        gender: data.gender,
        age: Number(data.age),
        height: Number(data.height),
        weight: Number(data.weight),
        activityLevel: Number(data.activityLevel),
        goal: data.goal,
        targetCalories: nutritionResults.targetCalories,
        targetProteins: nutritionResults.targetProteins,
        targetFats: nutritionResults.targetFats,
        targetCarbs: nutritionResults.targetCarbs,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Помилка збереження анкетування:", error);
    return { error: "Не вдалося зберегти дані" };
  }
}
