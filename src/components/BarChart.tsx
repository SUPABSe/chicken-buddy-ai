/** Tiny dependency-free SVG bar chart. `data` is oldest → newest. */
export default function BarChart({ data, color = "#4C7A3F", height = 96 }: {
  data: { label: string; value: number }[]; color?: string; height?: number;
}) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" role="img" aria-label="Bar chart" preserveAspectRatio="none">
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 8);
        return (
          <rect key={i} x={i * barW + barW * 0.15} y={height - h} width={barW * 0.7} height={h}
            rx={2} fill={color} opacity={0.35 + 0.65 * (i / data.length)} />
        );
      })}
    </svg>
  );
}
