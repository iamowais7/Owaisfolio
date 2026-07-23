"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Line = { text: string; color: string };

const BOOT: Line[] = [
  { text: "owais-portfolio v2.0.0 — hacker terminal loaded", color: "#4ade80" },
  { text: 'type "help" for available commands.',             color: "#475569" },
];

const CMDS: Record<string, Line[]> = {
  help: [
    { text: "┌─ commands ─────────────────────────────────┐", color: "#22d3ee" },
    { text: "│  whoami      who is Mohammad Owais Khan     │", color: "#94a3b8" },
    { text: "│  skills      tech stack & expertise         │", color: "#94a3b8" },
    { text: "│  experience  work history                   │", color: "#94a3b8" },
    { text: "│  projects    featured builds                │", color: "#94a3b8" },
    { text: "│  contact     ways to reach me               │", color: "#94a3b8" },
    { text: "│  clear        clear terminal                │", color: "#94a3b8" },
    { text: "│  exit         close  [Esc]                  │", color: "#94a3b8" },
    { text: "└────────────────────────────────────────────┘", color: "#22d3ee" },
  ],
  whoami: [
    { text: "  Mohammad Owais Khan",                              color: "#818cf8" },
    { text: "  ─────────────────────────────────────────────",   color: "#1e293b" },
    { text: "  role       Software Development Engineer @ Fluree", color: "#e2e8f0" },
    { text: "  education  MCA · Aligarh Muslim University 2025",  color: "#e2e8f0" },
    { text: "  location   Delhi, India (Remote)",                 color: "#e2e8f0" },
    { text: "  focus      Backend · AI · Data Pipelines",         color: "#e2e8f0" },
    { text: "  status     ✓ Open to opportunities",              color: "#4ade80" },
  ],
  skills: [
    { text: "  backend     Node.js  Express  FastAPI  Python  Django", color: "#68a063" },
    { text: "  database    PostgreSQL  MongoDB",                        color: "#336791" },
    { text: "  devops      Apache Airflow  Git  Docker",               color: "#017cee" },
    { text: "  auth        Keycloak  OAuth 2.0  RBAC  JWT",            color: "#f43f5e" },
    { text: "  ai/llms     Claude  Gemini  GPT-4  Groq  Prompt Eng.", color: "#d4a574" },
    { text: "  frontend    React  Next.js  Tailwind  TypeScript",      color: "#61dafb" },
  ],
  experience: [
    { text: "  Fluree — Software Development Engineer",  color: "#818cf8" },
    { text: "  Nov 2025 → Present · Delhi, Remote",      color: "#475569" },
    { text: "",                                          color: "" },
    { text: "  Fluree — Software Trainee",               color: "#22d3ee" },
    { text: "  Aug 2025 → Oct 2025 · Delhi, Remote",     color: "#475569" },
    { text: "",                                          color: "" },
    { text: "  FEXLE Services — Summer Intern",          color: "#f472b6" },
    { text: "  Jun 2024 → Nov 2024 · Jaipur",            color: "#475569" },
  ],
  projects: [
    { text: "  Owaisfolio       owaisfolio.vercel.app",               color: "#818cf8" },
    { text: "  AI Trip Planner  ai-integrated-trip-planner.vercel.app", color: "#22d3ee" },
    { text: "  FitFeast AI      github.com/iamowais7/FitFeast-AI",    color: "#a78bfa" },
    { text: "  Plusfeed         plusfeed.vercel.app",                 color: "#ec4899" },
    { text: "  Payment App      payment-henna-rho.vercel.app",        color: "#34d399" },
    { text: "  Team Task Mgr    team-task-manager-beryl-seven.vercel.app", color: "#f59e0b" },
  ],
  contact: [
    { text: "  email     khan.owais0555@gmail.com",  color: "#e2e8f0" },
    { text: "  github    github.com/iamowais7",       color: "#e2e8f0" },
    { text: "  linkedin  linkedin.com/in/iamosk",     color: "#0077b5" },
    { text: "  twitter   x.com/iamosk_",              color: "#1da1f2" },
  ],
};

const PROMPT = "owais@portfolio:~$";

export default function Terminal() {
  const [open, setOpen]       = useState(false);
  const [entries, setEntries] = useState<Array<{ cmd?: string; lines: Line[] }>>([{ lines: BOOT }]);
  const [input, setInput]     = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.key === "`" || e.key === "~") { e.preventDefault(); setOpen(o => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    const openHandler = () => setOpen(true);
    window.addEventListener("keydown", handler);
    document.addEventListener("open-terminal", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.removeEventListener("open-terminal", openHandler);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const run = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    setHistory(h => [t, ...h]);
    setHistIdx(-1);
    if (t === "clear") { setEntries([{ lines: BOOT }]); return; }
    if (t === "exit" || t === "quit") { setOpen(false); return; }
    const output = CMDS[t] ?? [{ text: `bash: ${t}: command not found  (try "help")`, color: "#f87171" }];
    setEntries(prev => [...prev, { cmd, lines: output }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { if (input.trim()) run(input); setInput(""); }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(i); setInput(history[i] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i); setInput(i === -1 ? "" : history[i]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[58] bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "circOut" as const }}
            className="fixed bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-[59] w-full max-w-2xl px-4"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(2,6,23,0.98)",
                border: "1px solid rgba(74,222,128,0.18)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.75), 0 0 50px rgba(74,222,128,0.07)",
                backdropFilter: "blur(24px)",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/70">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-slate-600">owais@portfolio — bash</span>
                <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-300 transition-colors">
                  <X size={13} />
                </button>
              </div>

              <div className="px-4 pt-3 pb-1 font-mono text-sm space-y-0.5 overflow-y-auto max-h-64">
                {entries.map((entry, i) => (
                  <div key={i}>
                    {entry.cmd !== undefined && (
                      <div className="flex items-center gap-2 mt-2 mb-0.5">
                        <span style={{ color: "#4ade80" }}>{PROMPT}</span>
                        <span className="text-slate-100">{entry.cmd}</span>
                      </div>
                    )}
                    {entry.lines.map((line, j) => (
                      <div key={j} className="leading-[1.6] whitespace-pre" style={{ color: line.color || "#64748b" }}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="flex items-center gap-2 px-4 py-3 font-mono text-sm border-t border-slate-800/40 mt-1">
                <span style={{ color: "#4ade80" }}>{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent outline-none text-slate-100 caret-green-400"
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
                <span className="w-2 h-4 bg-green-400/70 animate-pulse rounded-sm" />
              </div>
            </div>
            <p className="text-center text-slate-700 text-[11px] font-mono mt-2">
              press [ ` ] to toggle · [ Esc ] to close
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
