"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavLinks from "@/components/header/NavLinks";
import UserAuthBlock from "@/components/header/UserAuthBlock";

export default function Header() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-purple-700 tracking-tight"
        >
          <span className="bg-purple-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold shadow-md shadow-purple-200">
            N
          </span>
          Nutri<span className="text-slate-900">Mind</span>
        </Link>

        {/* Десктопна навігація */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
          <NavLinks isAuthenticated={status === "authenticated"} />
        </nav>

        {/* Блок авторизації + гамбургер */}
        <div className="flex items-center gap-3">
          <UserAuthBlock
            status={status}
            session={session}
            onSignOut={handleSignOut}
          />

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition"
            aria-label="Меню"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <NavLinks
            isAuthenticated={status === "authenticated"}
            isMobile
            onLinkClick={closeMenu}
          />

          {status !== "authenticated" && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-xl font-semibold text-purple-700 bg-purple-50"
              >
                Увійти
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-xl font-semibold text-white bg-purple-600 shadow-md shadow-purple-200"
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
