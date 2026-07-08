export default function StatCard({ icon, label, value, sub, delay = 0 }: {
  icon: string; label: string; value: string; sub?: string; delay?: number;
}) {
  return (
    <div className="card animate-rise" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-2xl" aria-hidden>{icon}</div>
      <div className="mt-2 font-display text-2xl font-semibold leading-none">{value}</div>
      <div className="mt-1 text-sm text-paddy-900/60 dark:text-paddy-50/60">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-paddy-900/40 dark:text-paddy-50/40">{sub}</div>}
    </div>
  );
}
