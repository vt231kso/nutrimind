"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthAction = (formData: FormData) => Promise<{ error?: string; success?: boolean }>;

export function useAuthForm(action: AuthAction, redirectTo: string) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await action(formData);

      if (result.error) {
        setError(result.error);
      } else {
        // Обов'язково оновлюємо сесійний кеш Next.js перед переходом
        router.refresh();
        router.push(redirectTo);
      }
    } catch {
      setError("Сталася неочікувана помилка.");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSubmit };
}
