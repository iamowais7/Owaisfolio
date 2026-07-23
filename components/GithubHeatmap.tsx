"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub } from "react-icons/fi";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_COLORS = [
  "rgba(99,102,241,0.07)",
  "rgba(99,102,241,0.3)",
  "rgba(99,102,241,0.52)",
  "rgba(99,102,241,0.74)",
  "rgba(129,140,248,0.95)",
];
const MONTHS    = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DOW_LABELS = ["", "M", "", "W", "", "F", ""];

function makeFallback(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().split("T")[0];
    const dow  = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    // More active from Aug 2025 onwards (Fluree start)
    const isActive = d >= new Date("2025-08-01");
    const base = isActive ? (isWeekend ? 0.25 : 0.7) : (isWeekend ? 0.08 : 0.28);
    const r = Math.random();
    let count = 0;
    if (r > base * 0.15) count = Math.floor(Math.random() * (isActive ? 9 : 5)) + 1;
    if (r > base * 0.85) count = 0;
    const level = (count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4) as Day["level"];
    days.push({ date, count, level });
  }
  return days;
}

const CELL = 10;
const GAP  = 3;
const STEP = CELL + GAP;

export default function GithubHeatmap() {
  const [days, setDays]           = useState<Day[]>([]);
  const [tooltip, setTooltip]     = useState<{ text: string; x: number; y: number } | null>(null);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Client-only: initialize fallback then try real data
  useEffect(() => {
    setDays(makeFallback());
    fetch("/api/github-contributions")
      .then(r => r.json())
      .then(({ contributions }: { contributions: Day[] }) => {
        if (contributions?.length) setDays(contributions);
      })
      .catch(() => {});
  }, []);

  if (!days.length) return <div ref={ref} className="mt-10 h-24" />;

  const yr         = new Date().getFullYear();
  const totalYear  = days.filter(d => d.date.startsWith(String(yr))).reduce((s, d) => s + d.count, 0);

  // Pad so grid starts on Sunday
  const firstDow  = new Date(days[0].date).getDay();
  const padded    = [...Array<null>(firstDow).fill(null), ...days];
  const totalCols = Math.ceil(padded.length / 7);

  // Month label positions
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  days.forEach((d, i) => {
    const m   = new Date(d.date).getMonth();
    const col = Math.floor((i + firstDow) / 7);
    if (m !== lastMonth) { monthLabels.push({ label: MONTHS[m], col }); lastMonth = m; }
  });

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FiGithub size={16} className="text-indigo-400" />
        <span className="text-sm font-mono text-slate-400">
          <span className="text-slate-200 font-semibold">{totalYear}</span> contributions in {yr}
        </span>
        <a
          href="https://github.com/iamowais7"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          @iamowais7 ↗
        </a>
      </div>

      {/* SVG heatmap */}
      <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <svg width={totalCols * STEP + 24} height={7 * STEP + 24} className="block">
          {/* Day-of-week labels */}
          {DOW_LABELS.map((label, row) =>
            label ? (
              <text key={row} x={0} y={row * STEP + CELL + 20} fontSize={9} fill="#334155" fontFamily="monospace">
                {label}
              </text>
            ) : null
          )}

          {/* Month labels */}
          {monthLabels.map(({ label, col }) => (
            <text key={`${label}-${col}`} x={col * STEP + 20} y={10} fontSize={9} fill="#475569" fontFamily="monospace">
              {label}
            </text>
          ))}

          {/* Cells */}
          {Array.from({ length: totalCols }, (_, col) =>
            Array.from({ length: 7 }, (_, row) => {
              const day = padded[col * 7 + row];
              if (!day) return null;
              const x = col * STEP + 20;
              const y = row * STEP + 16;
              return (
                <motion.rect
                  key={`${col}-${row}`}
                  x={x} y={y}
                  width={CELL} height={CELL} rx={2}
                  fill={LEVEL_COLORS[day.level]}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: Math.min(col * 0.007, 0.3), duration: 0.22, ease: "easeOut" }}
                  style={{ cursor: "pointer", transformOrigin: `${x + CELL / 2}px ${y + CELL / 2}px` }}
                  onMouseEnter={e => {
                    const svg = (e.target as SVGElement).closest("svg")!.getBoundingClientRect();
                    setTooltip({
                      text: day.count === 0
                        ? `No contributions · ${day.date}`
                        : `${day.count} contribution${day.count > 1 ? "s" : ""} · ${day.date}`,
                      x: svg.left + x + CELL / 2,
                      y: svg.top + y - 4,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] font-mono text-slate-700 mr-0.5">Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[10px] font-mono text-slate-700 ml-0.5">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-lg text-[11px] font-mono -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            background: "rgba(6,9,30,0.96)",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            color: "#e2e8f0",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
