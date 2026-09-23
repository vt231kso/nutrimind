import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "NutriMind — Персональний трекер харчування та КБЖВ",
  description: "Розрахунок добової норми калорій, щоденник харчування та рекомендації з штучним інтелектом.",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
    <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col justify-between`}>
    <SessionProvider>
      {/* Хедер на всіх сторінках */}
      <Header />

      {/* Контент сторінки */}
      <div className="flex-1">
        {children}
      </div>

      {/* Футер на всіх сторінках */}
      <Footer />
    </SessionProvider>
    </body>
    </html>
  );
}
