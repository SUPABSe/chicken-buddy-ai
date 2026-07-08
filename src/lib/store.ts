"use client";
import type { FarmSettings, LogEntry, MoneyEntry } from "./types";

/**
 * On-device data layer. Everything lives in localStorage, so the app
 * needs no backend, no account, and works fully offline.
 *
 * All screens go through this interface — a future cloud-sync or AI
 * version only has to swap the implementations here.
 */

const LS_KEYS = { logs: "cb.logs", money: "cb.money", settings: "cb.settings" } as const;

const DEFAULT_SETTINGS: FarmSettings = {
  farmName: "My Farm",
  flockSize: 12,
  feedStockKg: 20,
  currency: "USD",
  locale: "en",
};

function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  // ---------- settings ----------
  async getSettings(): Promise<FarmSettings> {
    return lsGet(LS_KEYS.settings, DEFAULT_SETTINGS);
  },
  async saveSettings(s: FarmSettings): Promise<void> {
    lsSet(LS_KEYS.settings, s);
  },

  // ---------- daily logs ----------
  async getLogs(): Promise<LogEntry[]> {
    return lsGet<LogEntry[]>(LS_KEYS.logs, []).sort((a, b) => b.date.localeCompare(a.date));
  },
  async saveLog(entry: LogEntry): Promise<void> {
    const logs = lsGet<LogEntry[]>(LS_KEYS.logs, []).filter((l) => l.date !== entry.date);
    lsSet(LS_KEYS.logs, [entry, ...logs]);
  },

  // ---------- money ----------
  async getMoney(): Promise<MoneyEntry[]> {
    return lsGet<MoneyEntry[]>(LS_KEYS.money, []).sort((a, b) => b.date.localeCompare(a.date));
  },
  async addMoney(entry: MoneyEntry): Promise<void> {
    lsSet(LS_KEYS.money, [entry, ...lsGet<MoneyEntry[]>(LS_KEYS.money, [])]);
  },
};

export function todayStr(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
export function uid(): string {
  return crypto.randomUUID();
}
