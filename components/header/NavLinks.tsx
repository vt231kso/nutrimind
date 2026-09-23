"use client";

import Link from "next/link";

interface NavLinksProps {
  isAuthenticated: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({
                                   isAuthenticated,
                                   isMobile,
                                   onLinkClick,
                                 }: NavLinksProps) {
  const baseStyle = isMobile
    ? "block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
    : "hover:text-purple-600 transition";

  const activeStyle = isMobile
    ? "block px-3 py-2 rounded-lg text-base font-semibold text-purple-700 bg-purple-50/60 transition"
    : "text-purple-600 font-semibold transition";

  return (
    <>
      <Link href="/" onClick={onLinkClick} className={baseStyle}>
        Головна
      </Link>

      {isAuthenticated && (
        <Link href="/dashboard" onClick={onLinkClick} className={activeStyle}>
          {isMobile ? "📊 Щоденник" : "Щоденник"}
        </Link>
      )}

      <Link href="#recipes" onClick={onLinkClick} className={baseStyle}>
        Рецепти
      </Link>

      <Link href="#about" onClick={onLinkClick} className={baseStyle}>
        Про проєкт
      </Link>
    </>
  );
}
