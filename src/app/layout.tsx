import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import RegisterSW from "@/components/RegisterSW";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Chicken Buddy AI",
  description: "An experienced farmer in your pocket.",
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  themeColor: "#3D6433",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Apply saved theme before paint to avoid flash
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('cb.theme')==='dark'||(!localStorage.getItem('cb.theme')&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <div className="mx-auto min-h-dvh max-w-md pb-24">
          <header className="flex items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-2xl">🐔</span>
              <span className="font-display text-lg font-semibold">Chicken Buddy</span>
            </div>
            <ThemeToggle />
          </header>
          <main className="px-5 pt-4">{children}</main>
        </div>
        <BottomNav />
        <RegisterSW />
      </body>
    </html>
  );
}
