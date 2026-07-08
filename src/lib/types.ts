export type LogEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  eggs: number;
  feedAddedKg: number;
  waterChanged: boolean;
  sickCount: number;
  notes: string;
  createdAt: string;
};

export type MoneyEntry = {
  id: string;
  date: string;
  kind: "feed_cost" | "egg_sale" | "chicken_purchase" | "other_income" | "other_expense";
  amount: number; // in local currency
  note: string;
};

export type FarmSettings = {
  farmName: string;
  flockSize: number;
  feedStockKg: number;
  currency: string; // e.g. "USD", "KHR"
  locale: Locale;
};

export type Locale = "en" | "km" | "ja";

export type ChatMessage = { role: "user" | "assistant"; content: string };
