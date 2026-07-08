"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cb.theme", next ? "dark" : "light");
  }
  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-card text-lg dark:bg-night-850 dark:ring-1 dark:ring-white/10">
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
