"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Заповніть усі обов'язкові поля!" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Користувач з таким Email вже існує!" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return { success: true, userId: newUser.id };
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return { error: "Сталася помилка на сервері при реєстрації." };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Заповніть усі поля!" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return { error: "Невірний email або пароль!" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return { error: "Невірний email або пароль!" };
    }

    // 🍪 Записуємо сесію в HTTP-only Cookie на 7 днів
    const cookieStore = await cookies();
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 днів
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Помилка входу:", error);
    return { error: "Сталася помилка при вході." };
  }
}

// 🚪 Функція для виходу з акаунту
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
}

// 👤 Отримання поточного авторизованого користувача
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}
