"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import WeatherCard from "@/components/WeatherCard";
import { store, todayStr } from "@/lib/store";
import { tipForToday } from "@/lib/tips";
import { t } from "@/lib/i18n";
import type { FarmSettings, LogEntry } from "@/lib/types";

export default function Dashboard() {
  const tr = t();
  const [settings, setSettings] = useState<FarmSettings | null>(null);
  const [todayLog, setTodayLog] = useState<LogEntry | null>(null);
  const [feedDays, setFeedDays] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const [s, logs] = await Promise.all([store.getSettings(), store.getLogs()]);
      setSettings(s);
      setTodayLog(logs.find((l) => l.date === todayStr()) ?? null);
      // Rough feed runway: ~120 g per chicken per day
      const dailyUse = (s.flockSize * 0.12) || 1;
      setFeedDays(Math.max(0, Math.floor(s.feedStockKg / dailyUse)));
    })();
  }, []);

  if (!settings) return <div className="pt-10 text-center text-paddy-900/40 dark:text-paddy-50/40">…</div>;

  const sick = todayLog?.sickCount ?? 0;

  return (
    <div className="space-y-4">
      <h1 className="animate-rise font-display text-3xl font-semibold leading-tight">
        Good day at<br />{settings.farmName} 🌾
      </h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="🐔" label={tr.dashboard.chickens} value={String(settings.flockSize)} delay={0} />
        <StatCard icon="🥚" label={tr.dashboard.eggsToday} value={String(todayLog?.eggs ?? 0)} delay={60} />
        <StatCard icon="🌾" label={tr.dashboard.feedLeft} value={`${settings.feedStockKg} kg`}
          sub={feedDays !== null ? `≈ ${feedDays} ${tr.dashboard.days}` : undefined} delay={120} />
        <StatCard icon="💧" label={tr.dashboard.water}
          value={todayLog?.waterChanged ? tr.dashboard.waterFresh : tr.dashboard.waterCheck} delay={180} />
      </div>

      <div className="card animate-rise">
        <div className="text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">{tr.dashboard.healthOverview}</div>
        <div className="mt-1 flex items-center gap-2 text-base">
          <span aria-hidden>{sick > 0 ? "🟡" : "🟢"}</span>
          {sick > 0 ? tr.dashboard.sickWatch(sick) : tr.dashboard.allGood}
        </div>
      </div>

      <WeatherCard />

      <div className="card animate-rise border-l-4 border-yolk-500">
        <div className="text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">{tr.dashboard.tipOfDay}</div>
        <p className="mt-1 leading-snug">{tipForToday()}</p>
      </div>

      <div className="card animate-rise">
        <div className="text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">{tr.dashboard.todayNote}</div>
        <p className="mt-1 text-sm leading-snug">
          {todayLog?.notes || tr.dashboard.noNote}
        </p>
        <Link href="/log" className="btn-yolk mt-3 inline-flex items-center">📓 Open today&apos;s log</Link>
      </div>
    </div>
  );
}
