import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Отримуємо розраховані норми КБЖВ користувача з Neon Postgres
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      targetCalories: true,
      targetProteins: true,
      targetFats: true,
      targetCarbs: true,
    },
  });

  // Якщо користувач ще не пройшов анкетування — відправляємо на onboarding
  if (!user?.targetCalories) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Привітання */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Вітаємо, {user.name || "користувач"}! 👋
          </h1>
          <p className="text-xs text-slate-500">Ось ваш щоденний баланс харчування</p>
        </div>

        {/* Блок КБЖВ */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-purple-100/50 border border-purple-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-2xl text-center">
            <span className="text-xs font-semibold text-purple-600 block mb-1">Калорії</span>
            <span className="text-2xl font-bold text-purple-900">0 / {user.targetCalories}</span>
            <span className="text-[10px] text-purple-400 block mt-1">ккал</span>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl text-center">
            <span className="text-xs font-semibold text-blue-600 block mb-1">Білки</span>
            <span className="text-xl font-bold text-blue-900">0 / {user.targetProteins}г</span>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl text-center">
            <span className="text-xs font-semibold text-amber-600 block mb-1">Жири</span>
            <span className="text-xl font-bold text-amber-900">0 / {user.targetFats}г</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl text-center">
            <span className="text-xs font-semibold text-emerald-600 block mb-1">Вуглеводи</span>
            <span className="text-xl font-bold text-emerald-900">0 / {user.targetCarbs}г</span>
          </div>
        </div>

        {/* Розділи прийомів їжі */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-800">Прийоми їжі</h2>

          {["Сніданок", "Обід", "Вечеря", "Перекус"].map((meal) => (
            <div
              key={meal}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-slate-700 text-sm">{meal}</h3>
                <p className="text-xs text-slate-400">Ще немає доданих продуктів</p>
              </div>
              <button className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-xl text-xs font-semibold hover:bg-purple-100 transition">
                + Додати
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
