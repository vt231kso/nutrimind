"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    // Виходимо з сесії та перенаправляємо на головну сторінку
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-purple-700 tracking-tight">
          <span className="bg-purple-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold shadow-md shadow-purple-200">
            N
          </span>
          Nutri<span className="text-slate-900">Mind</span>
        </Link>

        {/* Навігація */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
          <Link href="/" className="text-purple-600 font-semibold transition">
            Головна
          </Link>
          <Link href="#recipes" className="hover:text-purple-600 transition">
            Рецепти
          </Link>

          {/* Показуємо "Щоденник" ТІЛЬКИ авторизованому користувачу */}
          {status === "authenticated" && (
            <Link href="/dashboard" className="hover:text-purple-600 transition">
              Щоденник
            </Link>
          )}

          <Link href="#about" className="hover:text-purple-600 transition">
            Про проєкт
          </Link>
        </nav>

        {/* Блок авторизації */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-xl" />
          ) : status === "authenticated" && session?.user ? (
            /* Авторизований режим */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "Аватар"}
                    width={36}
                    height={36}
                    className="rounded-full border border-purple-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm border border-purple-200">
                    {session.user.name?.[0] || "U"}
                  </div>
                )}
                <span className="hidden sm:inline text-sm font-semibold text-slate-700">
                  {session.user.name?.split(" ")[0]}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-xl transition"
              >
                Вийти
              </button>
            </div>
          ) : (
            /* Гостьовий режим */
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-xl transition"
              >
                Увійти
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-purple-200 transition active:scale-95"
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
