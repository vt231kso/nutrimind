import { NutritionParams } from "@/lib/nutrition";
import { Button } from "@/components/ui/Button";
import { ACTIVITY_LEVELS } from "@/lib/constants/onboarding";

interface Props {
  formData: NutritionParams;
  setFormData: (data: NutritionParams) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepActivity({ formData, setFormData, onNext, onBack }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800">Рівень активності</h2>

      {ACTIVITY_LEVELS.map((act) => (
        <button
          key={act.level}
          type="button"
          onClick={() => setFormData({ ...formData, activityLevel: act.level })}
          className={`w-full p-4 rounded-2xl border text-left transition ${
            formData.activityLevel === act.level
              ? "border-purple-600 bg-purple-50 text-purple-900"
              : "border-slate-200 text-slate-700"
          }`}
        >
          <div className="font-semibold text-sm">{act.label}</div>
          <div className="text-xs text-slate-500">{act.desc}</div>
        </button>
      ))}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          Назад
        </Button>
        <Button onClick={onNext} className="w-2/3">
          Далі
        </Button>
      </div>
    </div>
  );
}
