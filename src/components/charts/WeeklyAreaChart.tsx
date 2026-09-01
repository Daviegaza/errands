import { motion } from "framer-motion";
import { useId, useMemo, useState } from "react";

const WIDTH = 600;
const HEIGHT = 200;
const PAD_X = 22;
const PAD_TOP = 16;
const PAD_BOTTOM = 30;

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function WeeklyAreaChart({ data, formatValue }: { data: { day: string; amount: number }[]; formatValue: (value: number) => string }) {
  const gradientId = useId();
  const [hover, setHover] = useState<number | null>(null);
  const { points, linePath, areaPath, baseline } = useMemo(() => {
    const values = data.map((d) => d.amount);
    const min = Math.min(...values) * 0.85;
    const max = Math.max(...values) * 1.08;
    const innerWidth = WIDTH - PAD_X * 2;
    const innerHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
    const pts = data.map((d, index) => ({
      x: PAD_X + (index / (data.length - 1)) * innerWidth,
      y: PAD_TOP + innerHeight - ((d.amount - min) / (max - min || 1)) * innerHeight,
    }));
    const base = PAD_TOP + innerHeight;
    const line = smoothPath(pts);
    const area = `${line} L ${pts[pts.length - 1].x} ${base} L ${pts[0].x} ${base} Z`;
    return { points: pts, linePath: line, areaPath: area, baseline: base };
  }, [data]);

  const active = hover !== null ? data[hover] : null;
  const activePoint = hover !== null ? points[hover] : null;

  return (
    <div
      className="weekly-chart"
      role="img"
      aria-label={`Weekly earnings chart. ${data.map((d) => `${d.day} ${formatValue(d.amount)}`).join(", ")}.`}
      onPointerLeave={() => setHover(null)}
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16C784" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#16C784" stopOpacity={0} />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={PAD_X} x2={WIDTH - PAD_X} y1={PAD_TOP + t * (baseline - PAD_TOP)} y2={PAD_TOP + t * (baseline - PAD_TOP)} className="weekly-chart-grid" />
        ))}
        <motion.path d={areaPath} fill={`url(#${gradientId})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
        <motion.path d={linePath} fill="none" stroke="#129C68" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} />
        {activePoint && <line x1={activePoint.x} x2={activePoint.x} y1={PAD_TOP} y2={baseline} className="weekly-chart-guide" />}
        {points.map((p, index) => (
          <motion.circle
            key={data[index].day}
            cx={p.x}
            cy={p.y}
            r={hover === index ? 5.5 : 3.5}
            className="weekly-chart-dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + index * 0.05, duration: 0.25 }}
            onPointerEnter={() => setHover(index)}
          />
        ))}
        {points.map((p, index) => (
          <rect key={`hit-${data[index].day}`} x={p.x - (WIDTH / data.length) / 2} y={0} width={WIDTH / data.length} height={HEIGHT} fill="transparent" onPointerEnter={() => setHover(index)} />
        ))}
      </svg>
      <div className="weekly-chart-labels">{data.map((d) => <span key={d.day}>{d.day}</span>)}</div>
      {active && activePoint && (
        <div className="weekly-chart-tooltip" style={{ left: `${(activePoint.x / WIDTH) * 100}%` }}>
          <small>{active.day}</small>
          <b>{formatValue(active.amount)}</b>
        </div>
      )}
    </div>
  );
}
