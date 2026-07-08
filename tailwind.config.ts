import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // "Morning coop" palette: rice-paddy green + egg-yolk amber
        yolk: { 400: "#F5B301", 500: "#E8A200", 600: "#C98A00" },
        paddy: { 50: "#F2F7F0", 100: "#E2EEDC", 500: "#4C7A3F", 600: "#3D6433", 700: "#2F4E28", 900: "#1B2E17" },
        night: { 800: "#182119", 850: "#131A14", 900: "#0E140F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgba(27,46,23,.06), 0 8px 24px -12px rgba(27,46,23,.18)",
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        pop: { "0%": { transform: "scale(.96)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        rise: "rise .45s cubic-bezier(.22,1,.36,1) both",
        pop: "pop .18s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
