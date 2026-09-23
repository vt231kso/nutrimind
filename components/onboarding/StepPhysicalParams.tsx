import { NutritionParams } from "@/lib/nutrition";
import { Button } from "@/components/ui/Button";
import { GENDERS } from "@/lib/constants/onboarding";

interface Props {
  formData: NutritionParams;
  setFormData: (data: NutritionParams) => void;
  onNext: () => void;
}

export function StepPhysicalParams({ formData, setFormData, onNext }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800">Ваші фізичні параметри</h2>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-2 block">Стать</label>
        <div className="grid grid-cols-2 gap-3">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setFormData({ ...formData, gender: g.id })}
              className={`p-3 rounded-2xl border text-sm font-semibold transition ${
                formData.gender === g.id
                  ? "border-purple-600 bg-purple-50 text-purple-700"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Вік", key: "age" },
          { label: "Зріст (см)", key: "height" },
          { label: "Вага (кг)", key: "weight" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">{label}</label>
            <input
              type="number"
              value={formData[key as keyof NutritionParams]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: Number(e.target.value) })
              }
              className="w-full p-3 border border-slate-200 rounded-2xl text-center font-semibold text-slate-800 focus:outline-purple-600"
            />
          </div>
        ))}
      </div>

      <Button onClick={onNext} className="w-full mt-4">
        Далі
      </Button>
    </div>
  );
}
