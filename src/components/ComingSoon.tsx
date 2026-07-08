import Link from "next/link";
import { t } from "@/lib/i18n";

/**
 * Placeholder screen for future AI features.
 * When AI returns, replace this component's usage in /chat and /health
 * with the real screens — nav, routing, and design stay unchanged.
 */
export default function ComingSoon({ icon, title, body }: { icon: string; title: string; body: string }) {
  const tr = t();
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
      <div className="card animate-rise w-full max-w-sm py-10">
        <div className="text-5xl" aria-hidden>{icon}</div>
        <span className="mt-4 inline-block rounded-full bg-yolk-400/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yolk-600">
          {tr.comingSoon.badge}
        </span>
        <h1 className="mt-3 font-display text-2xl font-semibold">{title}</h1>
        <p className="mx-auto mt-2 max-w-[30ch] text-sm leading-relaxed text-paddy-900/60 dark:text-paddy-50/60">
          {body}
        </p>
        <p className="mx-auto mt-3 max-w-[30ch] text-xs leading-relaxed text-paddy-900/40 dark:text-paddy-50/40">
          {tr.comingSoon.meanwhile}
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex items-center">{tr.comingSoon.backHome}</Link>
      </div>
    </div>
  );
}
