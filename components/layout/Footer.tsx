import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-purple-100 py-8 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Логотип та копірайт */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-purple-900">NutriMind</span>
          <span className="text-xs text-slate-400">© {new Date().getFullYear()} Усі права захищено.</span>
        </div>

        {/* Навігація в футері */}
        <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
          <Link href="/privacy" className="hover:text-purple-600 transition">
            Політика конфіденційності
          </Link>
          <Link href="/terms" className="hover:text-purple-600 transition">
            Умови використання
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition">
            Контакти
          </Link>
        </div>

      </div>
    </footer>
  );
}
