// One tip per day, rotating deterministically by date.
// Written for a hot, humid Cambodian climate.
export const TIPS = [
  "Keep fresh, cool water available all day — chickens drink twice as much in hot weather.",
  "Collect eggs early in the morning before the heat, so they stay clean and fresh.",
  "Clean feeders every few days. Mouldy feed is one of the most common causes of sickness.",
  "Watch appetite closely: a chicken that skips a meal is often the first sign something is wrong.",
  "Keep bedding dry, especially in the rainy season. Wet litter breeds disease fast.",
  "Give shade at midday. Panting with open beaks means the flock is too hot.",
  "Check feet weekly for cuts or swelling — problems are easy to fix when caught early.",
  "Chickens love routine. Feeding at the same times every day keeps the flock calm.",
  "Isolate a sick chicken right away in a small, shaded pen with its own water.",
  "Kitchen scraps are fine as a treat, but avoid salty food, avocado, and raw beans.",
  "A dust-bathing area (dry soil + a little ash) keeps mites away naturally.",
  "Count your chickens at dusk when they roost — it takes ten seconds and catches problems.",
  "Strong eggshells need calcium: crushed eggshells or limestone grit work well.",
  "After rain, check the coop roof and corners for leaks before nightfall.",
] as const;

export function tipForToday(date = new Date()): string {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return TIPS[dayIndex % TIPS.length];
}
