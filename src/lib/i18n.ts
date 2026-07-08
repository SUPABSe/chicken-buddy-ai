import type { Locale } from "./types";

// English ships in v1. Khmer and Japanese slots are ready:
// add translations here and every screen picks them up automatically.
const dict = {
  en: {
    appName: "Chicken Buddy AI",
    tagline: "An experienced farmer in your pocket",
    nav: { home: "Home", chat: "Ask", health: "Health", log: "Log", profit: "Money" },
    dashboard: {
      chickens: "Chickens",
      eggsToday: "Eggs today",
      feedLeft: "Feed left",
      water: "Water",
      waterFresh: "Fresh",
      waterCheck: "Check it",
      todayNote: "Today's note",
      noNote: "No note yet — add one in the Log tab.",
      healthOverview: "Flock health",
      allGood: "All chickens look healthy",
      sickWatch: (n: number) => `${n} chicken${n > 1 ? "s" : ""} being watched`,
      tipOfDay: "Tip of the day",
      days: "days",
    },
    comingSoon: {
      chatTitle: "Farm assistant",
      healthTitle: "Photo health check",
      badge: "Coming soon",
      chatBody:
        "An AI helper that answers questions like \u201cWhat should I feed my chickens?\u201d is planned for a future update.",
      healthBody:
        "Upload a photo of a chicken and get gentle guidance on possible health concerns \u2014 planned for a future update.",
      meanwhile: "Until then, the daily tip on the Home screen shares one practical idea every day.",
      backHome: "Back to Home",
    },
    log: {
      title: "Daily log",
      eggs: "Eggs collected",
      feed: "Feed added (kg)",
      water: "Water changed",
      sick: "Sick chickens",
      notes: "Notes",
      save: "Save today's log",
      saved: "Saved",
      history: "History",
      empty: "No logs yet. Your first entry starts the story of the farm.",
    },
    profit: {
      title: "Money",
      income: "Income",
      expenses: "Expenses",
      profit: "Estimated profit",
      add: "Add entry",
      kinds: {
        feed_cost: "Feed cost",
        egg_sale: "Egg sale",
        chicken_purchase: "Chicken purchase",
        other_income: "Other income",
        other_expense: "Other expense",
      },
      last30: "Last 30 days",
    },
    weather: { title: "Weather" },
    common: { amount: "Amount", note: "Note", date: "Date", export: "Export PDF" },
  },
  km: null, // ready for Khmer
  ja: null, // ready for Japanese
} as const;

export function t(locale: Locale = "en") {
  return dict[locale] ?? dict.en;
}
