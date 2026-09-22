import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-purple-700 tracking-tight">
          <span className="bg-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-extrabold shadow-md shadow-purple-200">
            N
          </span>
          Nutri<span className="text-slate-900">Mind</span>
        </Link>
        <h2 className="mt-6 text-2xl font-extrabold text-slate-900">Вхід у систему</h2>
        <p className="mt-2 text-sm text-slate-600">
          Не маєте акаунта?{" "}
          <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-500">
            Зареєструватися
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div className="text-center text-xs text-slate-400">Завантаження...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
