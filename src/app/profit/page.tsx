"use client";
import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/BarChart";
import { store, todayStr, uid } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { MoneyEntry } from "@/lib/types";

const INCOME_KINDS = new Set(["egg_sale", "other_income"]);

export default function ProfitPage() {
  const tr = t();
  const [entries, setEntries] = useState<MoneyEntry[]>([]);
  const [kind, setKind] = useState<MoneyEntry["kind"]>("egg_sale");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    store.getMoney().then(setEntries);
    store.getSettings().then((s) => setCurrency(s.currency));
  }, []);

  const { income, expenses, weekly } = useMemo(() => {
    const cutoff = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
    const recent = entries.filter((e) => e.date >= cutoff);
    const income = recent.filter((e) => INCOME_KINDS.has(e.kind)).reduce((s, e) => s + e.amount, 0);
    const expenses = recent.filter((e) => !INCOME_KINDS.has(e.kind)).reduce((s, e) => s + e.amount, 0);
    // net per week for the mini chart (oldest → newest)
    const weekly = [3, 2, 1, 0].map((w) => {
      const from = new Date(Date.now() - (w + 1) * 7 * 86_400_000).toISOString().slice(0, 10);
      const to = new Date(Date.now() - w * 7 * 86_400_000).toISOString().slice(0, 10);
      const slice = entries.filter((e) => e.date > from && e.date <= to);
      const net = slice.reduce((s, e) => s + (INCOME_KINDS.has(e.kind) ? e.amount : -e.amount), 0);
      return { label: `w${4 - w}`, value: Math.max(0, net) };
    });
    return { income, expenses, weekly };
  }, [entries]);

  async function add() {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    await store.addMoney({ id: uid(), date: todayStr(), kind, amount: val, note });
    setEntries(await store.getMoney());
    setAmount(""); setNote("");
  }

  const fmt = (n: number) => `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-semibold">{tr.profit.title}</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="card animate-rise">
          <div className="text-xs text-paddy-900/60 dark:text-paddy-50/60">{tr.profit.income}</div>
          <div className="mt-1 font-display text-lg font-semibold text-paddy-600 dark:text-paddy-100">{fmt(income)}</div>
        </div>
        <div className="card animate-rise" style={{ animationDelay: "60ms" }}>
          <div className="text-xs text-paddy-900/60 dark:text-paddy-50/60">{tr.profit.expenses}</div>
          <div className="mt-1 font-display text-lg font-semibold text-red-600">{fmt(expenses)}</div>
        </div>
        <div className="card animate-rise" style={{ animationDelay: "120ms" }}>
          <div className="text-xs text-paddy-900/60 dark:text-paddy-50/60">{tr.profit.profit}</div>
          <div className="mt-1 font-display text-lg font-semibold">{fmt(income - expenses)}</div>
        </div>
      </div>

      <div className="card animate-rise">
        <div className="text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">{tr.profit.last30}</div>
        <div className="mt-2"><BarChart data={weekly} /></div>
      </div>

      <div className="card space-y-3">
        <select value={kind} onChange={(e) => setKind(e.target.value as MoneyEntry["kind"])} className="input">
          {Object.entries(tr.profit.kinds).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
        </select>
        <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)}
          placeholder={`${tr.common.amount} (${currency})`} className="input" />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={tr.common.note} className="input" />
        <button onClick={add} className="btn-primary w-full">{tr.profit.add}</button>
      </div>

      <ul className="space-y-2">
        {entries.slice(0, 20).map((e) => (
          <li key={e.id} className="card flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{tr.profit.kinds[e.kind]}</div>
              <div className="text-xs text-paddy-900/50 dark:text-paddy-50/50">{e.date}{e.note ? ` · ${e.note}` : ""}</div>
            </div>
            <span className={`font-display font-semibold ${INCOME_KINDS.has(e.kind) ? "text-paddy-600 dark:text-paddy-100" : "text-red-600"}`}>
              {INCOME_KINDS.has(e.kind) ? "+" : "−"}{fmt(e.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
