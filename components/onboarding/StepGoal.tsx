import { NutritionParams } from "@/lib/nutrition";
import { Button } from "@/components/ui/Button";
import { GOALS } from "@/lib/constants/onboarding";

interface Props {
  formData: NutritionParams;
  setFormData: (data: NutritionParams) => void;
  onFinish: () => void;
  onBack: () => void;
  loading: boolean;
}

export function StepGoal({ formData, setFormData, onFinish, onBack, loading }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800">Яка ваша мета?</h2>

      {GOALS.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => setFormData({ ...formData, goal: g.id })}
          className={`w-full p-4 rounded-2xl border text-left transition ${
            formData.goal === g.id
              ? "border-purple-600 bg-purple-50 text-purple-900"
              : "border-slate-200 text-slate-700"
          }`}
        >
          <div className="font-semibold text-sm">{g.label}</div>
          <div className="text-xs text-slate-500">{g.desc}</div>
        </button>
      ))}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          Назад
        </Button>
        <Button isLoading={loading} onClick={onFinish} className="w-2/3">
          Розрахувати КБЖВ
        </Button>
      </div>
    </div>
  );
}
