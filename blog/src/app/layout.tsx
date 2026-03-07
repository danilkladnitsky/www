// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Блог Данила Кладницкого", template: "%s | Блог Данила Кладницкого" },
  description: "Статьи о разработке Frontend и Backend",
  openGraph: { title: "Блог", description: "Статьи о разработке Frontend и Backend" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main id="main" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}