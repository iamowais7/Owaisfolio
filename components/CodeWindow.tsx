"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Token = { text: string; color: string };
type Line  = { tokens: Token[] };

const LINES: Line[] = [
  { tokens: [{ text: "// owais.config.ts", color: "#4a5568" }] },
  { tokens: [] },
  { tokens: [{ text: "const ", color: "#c084fc" }, { text: "developer", color: "#67e8f9" }, { text: " = {", color: "#cbd5e1" }] },
  { tokens: [{ text: "  name", color: "#818cf8" }, { text: ":     ", color: "#cbd5e1" }, { text: '"Mohammad Owais Khan"', color: "#86efac" }, { text: ",", color: "#cbd5e1" }] },
  { tokens: [{ text: "  role", color: "#818cf8" }, { text: ":     ", color: "#cbd5e1" }, { text: '"SDE @ Fluree"', color: "#86efac" }, { text: ",", color: "#cbd5e1" }] },
  { tokens: [{ text: "  available", color: "#818cf8" }, { text: ":", color: "#cbd5e1" }, { text: " true", color: "#fb923c" }, { text: ",  // open to opportunities", color: "#4a5568" }] },
  { tokens: [] },
  { tokens: [{ text: "  stack", color: "#818cf8" }, { text: ": {", color: "#cbd5e1" }] },
  { tokens: [{ text: "    backend", color: "#818cf8" }, { text: ":  [", color: "#cbd5e1" }, { text: '"Node.js"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"Python"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"FastAPI"', color: "#86efac" }, { text: "],", color: "#cbd5e1" }] },
  { tokens: [{ text: "    frontend", color: "#818cf8" }, { text: ": [", color: "#cbd5e1" }, { text: '"React"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"Next.js"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"TypeScript"', color: "#86efac" }, { text: "],", color: "#cbd5e1" }] },
  { tokens: [{ text: "    data", color: "#818cf8" }, { text: ":     [", color: "#cbd5e1" }, { text: '"PostgreSQL"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"Airflow"', color: "#86efac" }, { text: ", ", color: "#cbd5e1" }, { text: '"ETL"', color: "#86efac" }, { text: "],", color: "#cbd5e1" }] },
  { tokens: [{ text: "  },", color: "#cbd5e1" }] },
  { tokens: [] },
  { tokens: [{ text: "  passion", color: "#818cf8" }, { text: ": ", color: "#cbd5e1" }, { text: '"Building systems that scale"', color: "#86efac" }, { text: ",", color: "#cbd5e1" }] },
  { tokens: [{ text: "}", color: "#cbd5e1" }] },
];

export default function CodeWindow() {
  const [visible, setVisible] = useState(0);

  // Start immediately on mount — no IntersectionObserver needed
  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setVisible(i);
      if (i < LINES.length) {
        const delay = LINES[i - 1].tokens.length === 0 ? 60 : 100;
        setTimeout(tick, delay);
      }
    };
    const start = setTimeout(tick, 600);
    return () => clearTimeout(start);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: "circOut" as const }}
      className="w-full"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(5,8,25,0.92)",
          border: "1px solid rgba(99,102,241,0.22)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.07)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800/60"
          style={{ background: "rgba(10,14,40,0.9)" }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs font-mono text-slate-600">owais.config.ts</span>
          <span className="ml-auto text-xs font-mono" style={{ color: "#818cf8", opacity: 0.5 }}>TypeScript</span>
        </div>

        {/* Code body */}
        <div className="p-4 font-mono text-[11px] leading-relaxed">
          {LINES.slice(0, visible).map((line, i) => (
            <div key={i} className="flex gap-3 min-h-[1.4rem]">
              <span className="select-none w-4 text-right shrink-0" style={{ color: "#1e293b" }}>
                {i + 1}
              </span>
              <span className="flex-1">
                {line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.color }}>{tok.text}</span>
                ))}
                {i === visible - 1 && visible < LINES.length && (
                  <span
                    className="inline-block w-0.5 h-2.75 align-middle ml-px"
                    style={{ background: "#818cf8", animation: "blink 1s step-end infinite" }}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
