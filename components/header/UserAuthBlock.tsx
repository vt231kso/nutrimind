"use client";

import Link from "next/link";
import Image from "next/image";

interface UserAuthBlockProps {
  status: "loading" | "authenticated" | "unauthenticated";
  session: any;
  onSignOut: () => void;
}

export default function UserAuthBlock({
                                        status,
                                        session,
                                        onSignOut,
                                      }: UserAuthBlockProps) {
  if (status === "loading") {
    return <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-xl" />;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
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
          onClick={onSignOut}
          className="text-xs font-semibold text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-xl transition"
        >
          Вийти
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
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
    </div>
  );
}
