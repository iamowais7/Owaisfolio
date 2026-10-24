"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ExternalLink, Sparkles, ChevronDown } from "lucide-react";
import ScrambleText from "../ScrambleText";

const freelanceWork = {
  client:   "Hyperscalex.ai",
  role:     "AI Engineer — Freelance",
  duration: "2024 – Present",
  location: "Remote",
  status:   "Active",
  color:    "#22d3ee",
  desc: "Collaborating with Hyperscalex.ai's AI team on production LLM-driven systems, working alongside leadership with 25+ years of enterprise AI experience out of Google — including building a full automation infrastructure for one of their clients, orchestrating multiple pipeline scenarios end-to-end.",
  stats: [
    { label: "Users",            value: "1000+" },
    { label: "Pipelines",        value: "5" },
    { label: "Steps / pipeline", value: "15+" },
    { label: "ML models",        value: "3" },
  ],
  highlights: [
    "Automated 5 distinct pipeline scenarios, each spanning 15+ steps",
    "Built sync logic to keep every pipeline stage consistent end-to-end",
    "Integrated Gemini to generate output predictions",
    "Deployed 3 ML models that take input and return prediction outputs",
    "Connected Power BI dashboards for live data stats and visualization",
    "Built the client's entire infrastructure from the ground up",
  ],
  tags: ["AI / LLMs", "Gemini", "ML Models", "Power BI", "Pipeline Automation", "Node.js", "Python"],
  link: "https://hyperscalex.ai",
};

function StatTile({ label, value, color, delay, inView }: { label: string; value: string; color: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "circOut" as const }}
    >
      <div className="glass glow-border rounded-2xl p-4 holographic h-full flex flex-col items-center justify-center text-center">
        <p className="font-display font-bold text-2xl" style={{ color }}>{value}</p>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

export default function Freelance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  const askAi = () => {
    document.dispatchEvent(
      new CustomEvent("open-ai-chat-with", {
        detail: "Tell me about Owais's freelance work with Hyperscalex.ai.",
      })
    );
  };

  const c = freelanceWork;

  return (
    <section id="freelance" ref={ref} className="relative py-32 bg-slate-900/40 overflow-hidden">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-150 h-150 rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex"><Rocket size={12} />Client Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Freelance &amp; <ScrambleText text="Collabs" trigger={inView} className="gradient-text" delay={200} />
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Outside full-time work, I take on select freelance engagements.
          </p>
        </motion.div>

        {/* ── Bento grid: hero cell (2x2) + 4 stat tiles (1x1 each) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: "circOut" as const }}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div className="glass glow-border rounded-2xl p-7 holographic h-full flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
                  >
                    <span className="font-display font-bold text-xl" style={{ color: c.color }}>{c.client[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-slate-100">{c.role}</h3>
                    <p className="font-medium" style={{ color: c.color }}>{c.client}</p>
                  </div>
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono transition-colors shrink-0"
                  style={{ color: c.color }}
                >
                  <ExternalLink size={12} />
                  visit
                </a>
              </div>

              <p className="text-slate-500 text-xs font-mono mb-3">
                {c.duration} · {c.location} ·{" "}
                <span className="text-emerald-400">● {c.status}</span>
              </p>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.desc}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {c.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/70 text-slate-400 border border-slate-700/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {c.stats.map((s, i) => (
            <StatTile key={s.label} label={s.label} value={s.value} color={c.color} delay={0.1 + i * 0.07} inView={inView} />
          ))}
        </div>

        {/* ── Highlights — expandable, full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5"
        >
          <div className="glass glow-border rounded-2xl p-5 holographic">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }} />
              {expanded ? "Hide highlights" : "Show highlights"}
            </button>

            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5"
              >
                {c.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span style={{ color: c.color }} className="mt-1 shrink-0">›</span>
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5"
        >
          <div className="glass glow-border rounded-2xl p-5 holographic flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-300 text-sm font-medium text-center sm:text-left">
              Open to more freelance &amp; consulting work.
            </p>
            <button
              onClick={askAi}
              className="btn-secondary text-sm py-2 px-4 shrink-0 w-full sm:w-auto justify-center"
            >
              <Sparkles size={14} />
              Ask AI about this
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
