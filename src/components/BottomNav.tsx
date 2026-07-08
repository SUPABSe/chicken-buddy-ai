"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";

const items = [
  { href: "/", label: t().nav.home, icon: "🏡" },
  { href: "/chat", label: t().nav.chat, icon: "💬" },
  { href: "/health", label: t().nav.health, icon: "🩺" },
  { href: "/log", label: t().nav.log, icon: "📓" },
  { href: "/profit", label: t().nav.profit, icon: "🪙" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-paddy-100 bg-white/90 backdrop-blur dark:border-white/5 dark:bg-night-850/90">
      <ul className="flex justify-around pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
        {items.map((it) => {
          const active = path === it.href;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`flex min-w-[56px] flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-xs transition-colors ${
                  active ? "text-paddy-600 dark:text-yolk-400 font-semibold" : "text-paddy-900/50 dark:text-paddy-50/50"
                }`}
              >
                <span className="text-xl" aria-hidden>{it.icon}</span>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
