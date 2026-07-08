"use client";
import { useEffect, useState } from "react";

type Weather = { current: number; tempMax: number; rainProb: number; advice: string[]; fetchedAt: string };

const CACHE_KEY = "cb.weather";
const LAT = process.env.NEXT_PUBLIC_FARM_LAT ?? "11.5564"; // Phnom Penh
const LON = process.env.NEXT_PUBLIC_FARM_LON ?? "104.9282";

function buildAdvice(tempMax: number, rainProb: number): string[] {
  const advice: string[] = [];
  if (tempMax >= 34) advice.push("Hot day ahead — add extra water containers and midday shade.", "Improve coop ventilation before noon.");
  else if (tempMax >= 31) advice.push("Warm day — keep water topped up and shaded.");
  if (rainProb >= 60) advice.push("Rain is likely — keep bedding dry and check the roof for leaks.");
  else if (rainProb >= 30) advice.push("Possible showers — have dry bedding ready.");
  if (advice.length === 0) advice.push("Mild conditions — a good day for coop cleaning.");
  return advice;
}

/**
 * Fetches Open-Meteo (free, no API key) directly from the browser and caches
 * the last result, so the card still shows recent advice when offline.
 */
export default function WeatherCard() {
  const [w, setW] = useState<Weather | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    // show cached weather immediately
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setW(JSON.parse(cached));
        setStale(true);
      }
    } catch {}

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m&daily=temperature_2m_max,precipitation_probability_max&timezone=auto&forecast_days=1`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const tempMax: number = data.daily?.temperature_2m_max?.[0] ?? 30;
        const rainProb: number = data.daily?.precipitation_probability_max?.[0] ?? 0;
        const fresh: Weather = {
          current: data.current?.temperature_2m ?? tempMax,
          tempMax,
          rainProb,
          advice: buildAdvice(tempMax, rainProb),
          fetchedAt: new Date().toISOString(),
        };
        setW(fresh);
        setStale(false);
        localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
      })
      .catch(() => {}); // offline: keep showing the cached card
  }, []);

  if (!w) return null;
  const hot = w.tempMax >= 34;
  const rainy = w.rainProb >= 60;

  return (
    <div className="card animate-rise">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-paddy-900/60 dark:text-paddy-50/60">
          Weather{stale ? " · last known" : ""}
        </span>
        <span className="text-xl" aria-hidden>{rainy ? "🌧️" : hot ? "🥵" : "🌤️"}</span>
      </div>
      <div className="mt-1 font-display text-2xl font-semibold">
        {Math.round(w.current)}°C
        <span className="ml-2 text-sm font-body font-normal text-paddy-900/50 dark:text-paddy-50/50">
          max {Math.round(w.tempMax)}° · rain {w.rainProb}%
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {w.advice.map((a) => (
          <li key={a} className="text-sm leading-snug">• {a}</li>
        ))}
      </ul>
    </div>
  );
}
