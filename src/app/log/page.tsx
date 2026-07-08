"use client";
import { useEffect, useState } from "react";
import { store, todayStr, uid } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { LogEntry } from "@/lib/types";

export default function LogPage() {
  const tr = t();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [eggs, setEggs] = useState(0);
  const [feed, setFeed] = useState(0);
  const [water, setWater] = useState(false);
  const [sick, setSick] = useState(0);
  const [notes, setNotes] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    store.getLogs().then((ls) => {
      setLogs(ls);
      const today = ls.find((l) => l.date === todayStr());
      if (today) {
        setEggs(today.eggs); setFeed(today.feedAddedKg); setWater(today.waterChanged);
        setSick(today.sickCount); setNotes(today.notes);
      }
    });
  }, []);

  async function save() {
    const entry: LogEntry = {
      id: uid(), date: todayStr(), eggs, feedAddedKg: feed,
      waterChanged: water, sickCount: sick, notes, createdAt: new Date().toISOString(),
    };
    await store.saveLog(entry);
    setLogs(await store.getLogs());
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  function Stepper({ value, onChange, label, icon }: { value: number; onChange: (n: number) => void; label: string; icon: string }) {
    return (
      <div className="card flex items-center justify-between">
        <div className="flex items-center gap-2"><span aria-hidden>{icon}</span><span className="text-sm">{label}</span></div>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange(Math.max(0, value - 1))} className="h-11 w-11 rounded-full bg-paddy-100 text-xl font-semibold dark:bg-white/10">−</button>
          <span className="w-8 text-center font-display text-xl font-semibold">{value}</span>
          <button onClick={() => onChange(value + 1)} className="h-11 w-11 rounded-full bg-paddy-100 text-xl font-semibold dark:bg-white/10">+</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">{tr.log.title}</h1>
        <button onClick={() => window.print()} className="no-print text-sm text-paddy-600 underline dark:text-yolk-400">
          {t().common.export}
        </button>
      </div>

      <div className="no-print space-y-3">
        <Stepper icon="🥚" label={tr.log.eggs} value={eggs} onChange={setEggs} />
        <Stepper icon="🌾" label={tr.log.feed} value={feed} onChange={setFeed} />
        <Stepper icon="🤒" label={tr.log.sick} value={sick} onChange={setSick} />
        <label className="card flex items-center justify-between">
          <span className="flex items-center gap-2"><span aria-hidden>💧</span><span className="text-sm">{tr.log.water}</span></span>
          <input type="checkbox" checked={water} onChange={(e) => setWater(e.target.checked)} className="h-6 w-6 accent-paddy-600" />
        </label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={tr.log.notes}
          rows={3} className="input h-auto py-3" />
        <button onClick={save} className="btn-yolk w-full">{savedFlash ? `✓ ${tr.log.saved}` : tr.log.save}</button>
      </div>

      <div>
        <h2 className="mt-2 text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">{tr.log.history}</h2>
        {logs.length === 0 && <p className="mt-2 text-sm text-paddy-900/40 dark:text-paddy-50/40">{tr.log.empty}</p>}
        <ul className="mt-2 space-y-2">
          {logs.map((l) => (
            <li key={l.date} className="card text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{l.date}</span>
                <span>🥚 {l.eggs} · 🌾 {l.feedAddedKg}kg · 💧 {l.waterChanged ? "✓" : "–"}{l.sickCount > 0 ? ` · 🤒 ${l.sickCount}` : ""}</span>
              </div>
              {l.notes && <p className="mt-1 text-paddy-900/60 dark:text-paddy-50/60">{l.notes}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
