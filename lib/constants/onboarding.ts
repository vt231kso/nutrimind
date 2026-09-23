export const ACTIVITY_LEVELS = [
  { level: 1.2, label: "Сидячий спосіб життя", desc: "Мінімум навантажень" },
  { level: 1.375, label: "Помірна активність", desc: "Тренування 1-3 рази на тиждень" },
  { level: 1.55, label: "Середня активність", desc: "Інтенсивний спорт 3-5 разів на тиждень" },
  { level: 1.725, label: "Висока активність", desc: "Щоденні важкі тренування" },
] as const;

export const GOALS = [
  { id: "LOSE", label: "🔥 Схуднути", desc: "Створення дефіциту калорій" },
  { id: "MAINTAIN", label: "⚖️ Підтримувати вагу", desc: "Збереження поточного балансу" },
  { id: "GAIN", label: "💪 Набрати масу", desc: "Профіцит калорій для росту м'язів" },
] as const;

export const GENDERS = [
  { id: "female", label: "Жіноча" },
  { id: "male", label: "Чоловіча" },
] as const;
