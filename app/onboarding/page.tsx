"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "@/app/actions/onboarding";
import { NutritionParams } from "@/lib/nutrition";
import { StepPhysicalParams } from "@/components/onboarding/StepPhysicalParams";
import { StepActivity } from "@/components/onboarding/StepActivity";
import { StepGoal } from "@/components/onboarding/StepGoal";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<NutritionParams>({
    gender: "female",
    age: 20,
    height: 168,
    weight: 60,
    activityLevel: 1.375,
    goal: "MAINTAIN",
  });

  const handleFinish = async () => {
    setLoading(true);
    setError(null);

    const res = await saveOnboardingData(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-xl shadow-purple-100/50 border border-purple-100">

        {/* Прогрес-бар */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            Крок {step} з 3
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= step ? "w-6 bg-purple-600" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Відображення активного кроку */}
        {step === 1 && (
          <StepPhysicalParams
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepActivity
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepGoal
            formData={formData}
            setFormData={setFormData}
            onFinish={handleFinish}
            onBack={() => setStep(2)}
            loading={loading}
          />
        )}
      </div>
    </main>
  );
}
