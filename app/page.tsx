import Link from "next/link";
import Header from "@/components/layout/Header";

// Тестові рецепти для демонстрації дизайну
const MOCK_RECIPES = [
  {
    id: "1",
    title: "Вівсяноблин з сиром та авокадо",
    calories: 420,
    proteins: 18,
    fats: 22,
    carbs: 35,
    time: "15 хв",
    category: "Сніданок",
  },
  {
    id: "2",
    title: "Запечене куряче філе з броколі",
    calories: 510,
    proteins: 48,
    fats: 12,
    carbs: 40,
    time: "35 хв",
    category: "Обід",
  },
  {
    id: "3",
    title: "Протеїновий смузі з ягодами",
    calories: 280,
    proteins: 24,
    fats: 4,
    carbs: 38,
    time: "5 хв",
    category: "Перекус",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      <Header />

      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-purple-50/60 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-purple-100 text-purple-700 font-semibold text-xs px-3 py-1.5 rounded-full mb-4">
            🤖 Розумний трекінг харчування з ШІ
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Твій персональний баланс калорій та <span className="text-purple-600">корисних рецептів</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Розраховуй індивідуальну норму КБЖВ, веди щоденник харчування та знаходь смачні страви для досягнення своїх цілей.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-purple-200 transition transform hover:-translate-y-0.5"
            >
              Розрахувати свою норму
            </Link>
            <Link
              href="#recipes"
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold px-8 py-3.5 rounded-xl transition"
            >
              Переглянути рецепти
            </Link>
          </div>
        </div>
      </section>


      <section id="recipes" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Популярні рецепти</h2>
            <p className="text-slate-500 text-sm mt-1">Збалансовані страви з підрахованим КБЖВ</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button className="bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl">Усі</button>
            <button className="bg-white text-slate-600 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition">
              Сніданки
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition">
              Обіди
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition">
              Перекуси
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl border border-purple-100 p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                    {recipe.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">⏱ {recipe.time}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition">
                  {recipe.title}
                </h3>
                <p className="text-2xl font-extrabold text-purple-700 mt-2">
                  {recipe.calories} <span className="text-xs font-medium text-slate-400">ккал</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 text-center text-xs">
                <div>
                  <span className="block text-slate-400">Білки</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">{recipe.proteins}г</span>
                </div>
                <div>
                  <span className="block text-slate-400">Жири</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">{recipe.fats}г</span>
                </div>
                <div>
                  <span className="block text-slate-400">Вуглеводи</span>
                  <span className="font-bold text-slate-700 mt-0.5 block">{recipe.carbs}г</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} NutriMind. Усі права захищено. Курсова робота.
        </div>
      </footer>
    </div>
  );
}
