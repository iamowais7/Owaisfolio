"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

type Achievement = {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  color: string;
};

const ACHIEVEMENTS: Record<string, Achievement> = {
  terminal:   { id: "terminal",   emoji: "🖥️",  title: "Hacker Mode",    desc: "Opened the secret terminal",       color: "#4ade80" },
  palette:    { id: "palette",    emoji: "⚡",  title: "Power User",     desc: "Discovered the command palette",   color: "#818cf8" },
  "ai-chat":  { id: "ai-chat",   emoji: "🤖",  title: "AI Curious",     desc: "Started a chat with Owais AI",    color: "#22d3ee" },
  explorer:   { id: "explorer",   emoji: "🗺️",  title: "Explorer",       desc: "Reached the end of the journey",  color: "#f59e0b" },
  "dark-side":{ id: "dark-side", emoji: "🌙",  title: "Dark Side",      desc: "Switched to dark theme",          color: "#c084fc" },
};

export default function AchievementToast() {
  const [toasts, setToasts]       = useState<Achievement[]>([]);
  const unlockedRef               = useRef<Set<string>>(new Set());

  const unlock = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return;
    const ach = ACHIEVEMENTS[id];
    if (!ach) return;
    // Persist in sessionStorage
    const stored = JSON.parse(sessionStorage.getItem("achievements") ?? "[]") as string[];
    if (stored.includes(id)) { unlockedRef.current.add(id); return; }
    sessionStorage.setItem("achievements", JSON.stringify([...stored, id]));
    unlockedRef.current.add(id);
    setToasts(prev => [...prev, ach]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  useEffect(() => {
    // Restore already-unlocked from session
    const stored = JSON.parse(sessionStorage.getItem("achievements") ?? "[]") as string[];
    stored.forEach(id => unlockedRef.current.add(id));

    // Listeners
    const onTerminal = () => unlock("terminal");
    const onPalette  = () => unlock("palette");
    const onAiChat   = () => unlock("ai-chat");
    const onTheme    = () => unlock("dark-side");

    document.addEventListener("open-terminal",         onTerminal);
    document.addEventListener("open-command-palette",  onPalette);
    document.addEventListener("open-ai-chat",          onAiChat);
    document.addEventListener("toggle-theme",          onTheme);

    // Scroll-to-bottom → Explorer
    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 120) {
        unlock("explorer");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("open-terminal",        onTerminal);
      document.removeEventListener("open-command-palette", onPalette);
      document.removeEventListener("open-ai-chat",         onAiChat);
      document.removeEventListener("toggle-theme",         onTheme);
      window.removeEventListener("scroll", onScroll);
    };
  }, [unlock]);

  return (
    <div className="fixed bottom-24 right-4 z-[500] flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(ach => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit={{    opacity: 0, x: 80, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[220px]"
            style={{
              background: "rgba(6,9,30,0.97)",
              border: `1px solid ${ach.color}35`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${ach.color}18`,
              backdropFilter: "blur(24px)",
            }}
          >
            <span className="text-2xl shrink-0">{ach.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Trophy size={10} style={{ color: ach.color }} />
                <span
                  className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase"
                  style={{ color: ach.color }}
                >
                  Achievement Unlocked
                </span>
              </div>
              <p className="text-sm font-display font-semibold text-slate-100 leading-tight">{ach.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{ach.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
