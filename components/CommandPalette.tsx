"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, User, Cpu, Briefcase, FolderOpen, Mail,
  Download, GraduationCap, Sun, Moon, TerminalSquare, Flame,
} from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useTheme } from "next-themes";

type Cmd = {
  id: string;
  label: string;
  description?: string;
  category: "Navigate" | "Action";
  Icon: React.ElementType;
  action: () => void;
};

function scrollTo(id: string, close: () => void) {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  close();
}

export default function CommandPalette() {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const itemRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const show = window.setTimeout(() => setShowHint(true), 2500);
    const hide = window.setTimeout(() => setShowHint(false), 8500);
    return () => { window.clearTimeout(show); window.clearTimeout(hide); };
  }, []);

  const close = () => { setOpen(false); setQuery(""); setSelected(0); };

  const commands: Cmd[] = [
    { id: "about",      label: "About",           description: "Who I am",                  category: "Navigate", Icon: User,          action: () => scrollTo("about",      close) },
    { id: "skills",     label: "Skills",           description: "Tech stack",                category: "Navigate", Icon: Cpu,           action: () => scrollTo("skills",     close) },
    { id: "experience", label: "Experience",       description: "Work history",              category: "Navigate", Icon: Briefcase,     action: () => scrollTo("experience", close) },
    { id: "projects",   label: "Projects",         description: "Things I've built",         category: "Navigate", Icon: FolderOpen,    action: () => scrollTo("projects",   close) },
    { id: "vibes",      label: "Vibes",            description: "My aesthetic",              category: "Navigate", Icon: Flame,         action: () => scrollTo("vibes",      close) },
    { id: "education",  label: "Education",        description: "Academic background",       category: "Navigate", Icon: GraduationCap, action: () => scrollTo("education",  close) },
    { id: "contact",    label: "Contact",          description: "Get in touch",              category: "Navigate", Icon: Mail,          action: () => scrollTo("contact",    close) },
    {
      id: "resume", label: "Download Resume", description: "Get my CV as PDF", category: "Action", Icon: Download,
      action: () => { const a = document.createElement("a"); a.href = "/Owais_Khan_Resume.pdf"; a.download = "Owais_Khan_Resume.pdf"; a.click(); close(); },
    },
    { id: "github",   label: "GitHub",        description: "github.com/iamowais7",     category: "Action", Icon: FiGithub,  action: () => { window.open("https://github.com/iamowais7",                       "_blank"); close(); } },
    { id: "linkedin", label: "LinkedIn",      description: "linkedin.com/in/iamosk",   category: "Action", Icon: FiLinkedin,action: () => { window.open("https://www.linkedin.com/in/iamosk",                 "_blank"); close(); } },
    { id: "twitter",  label: "Twitter / X",   description: "x.com/iamosk_",            category: "Action", Icon: FiTwitter, action: () => { window.open("https://x.com/iamosk_",                             "_blank"); close(); } },
    { id: "email",    label: "Send Email",    description: "khan.owais0555@gmail.com", category: "Action", Icon: Mail,      action: () => { window.open("mailto:khan.owais0555@gmail.com");                    close(); } },
    {
      id: "theme", label: mounted && resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Action", Icon: mounted && resolvedTheme === "dark" ? Sun : Moon,
      action: () => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); close(); },
    },
    {
      id: "terminal", label: "Open Hacker Terminal", description: 'or press the ` key', category: "Action", Icon: TerminalSquare,
      action: () => { document.dispatchEvent(new CustomEvent("open-terminal")); close(); },
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter(c =>
        c.label.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    : commands;

  const categories = [...new Set(filtered.map(c => c.category))] as ("Navigate" | "Action")[];

  // Build flat index map
  const flat: Cmd[] = [];
  categories.forEach(cat => flat.push(...filtered.filter(c => c.category === cat)));

  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { itemRefs.current[selected]?.scrollIntoView({ block: "nearest" }); }, [selected]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 40); }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => {
          if (!o) {
            setQuery(""); setSelected(0);
            setShowHint(false);
            document.dispatchEvent(new CustomEvent("open-command-palette"));
          }
          return !o;
        });
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, flat.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && flat[selected]) flat[selected].action();
  };

  return (
    <>
      {/* ── Hint popup ── */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.22, ease: "circOut" as const }}
            className="fixed bottom-6 left-6 z-55 pointer-events-none"
          >
            <div
              className="relative px-4 py-3 rounded-2xl rounded-bl-sm text-sm font-medium leading-snug"
              style={mounted && resolvedTheme === "light" ? {
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                backdropFilter: "blur(20px)",
                color: "#1e293b",
                whiteSpace: "nowrap",
              } : {
                background: "rgba(8,12,28,0.95)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                backdropFilter: "blur(20px)",
                color: "#f1f5f9",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>
                  ⚡{" "}
                  <kbd style={{ fontFamily: "monospace", fontSize: 11, padding: "1px 6px", borderRadius: 5, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.35)", color: "#818cf8" }}>Ctrl K</kbd>
                  {" "}<span style={{ color: mounted && resolvedTheme === "light" ? "#475569" : "#94a3b8" }}>— command palette</span>
                </span>
                <span style={{ color: mounted && resolvedTheme === "light" ? "#64748b" : "#94a3b8" }}>
                  🖥️{" "}
                  <kbd style={{ fontFamily: "monospace", fontSize: 11, padding: "1px 6px", borderRadius: 5, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>Ctrl `</kbd>
                  {" "}— hacker terminal
                </span>
              </span>
              {/* Tail pointing bottom-left */}
              <span
                className="absolute -bottom-2 left-5 w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `8px solid ${mounted && resolvedTheme === "light" ? "rgba(255,255,255,0.97)" : "rgba(8,12,28,0.95)"}`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.18, ease: "circOut" as const }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-201 w-full max-w-lg px-4"
            onKeyDown={handleKeyDown}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(6,9,30,0.98)",
                border: "1px solid rgba(99,102,241,0.28)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(99,102,241,0.08), 0 0 60px rgba(99,102,241,0.06)",
              }}
            >
              {/* Search row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-700/40">
                <Search size={15} className="text-slate-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 text-sm outline-none font-mono"
                />
                <div className="flex items-center gap-1">
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-500 border border-slate-700/50">ESC</kbd>
                </div>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-80 overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
                {flat.length === 0 && (
                  <p className="text-slate-600 text-sm text-center py-10 font-mono">No commands found</p>
                )}
                {categories.map(cat => {
                  const items = filtered.filter(c => c.category === cat);
                  return (
                    <div key={cat}>
                      <p className="px-4 pt-2 pb-1 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-slate-600">
                        {cat}
                      </p>
                      {items.map(cmd => {
                        const idx = flat.indexOf(cmd);
                        const isActive = idx === selected;
                        return (
                          <button
                            key={cmd.id}
                            ref={el => { itemRefs.current[idx] = el; }}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelected(idx)}
                            className="w-full flex items-center gap-3 px-3 py-2 mx-1 rounded-xl text-left transition-colors duration-75"
                            style={{
                              width: "calc(100% - 8px)",
                              background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                            }}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: isActive ? "rgba(99,102,241,0.22)" : "rgba(99,102,241,0.06)",
                                border: "1px solid rgba(99,102,241,0.18)",
                              }}
                            >
                              <cmd.Icon size={13} style={{ color: isActive ? "#818cf8" : "#475569" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate" style={{ color: isActive ? "#e2e8f0" : "#64748b" }}>
                                {cmd.label}
                              </p>
                              {cmd.description && (
                                <p className="text-xs text-slate-700 truncate">{cmd.description}</p>
                              )}
                            </div>
                            {isActive && (
                              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/25 shrink-0">
                                ↵
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-slate-700/40 flex items-center gap-5 text-[10px] font-mono text-slate-700">
                <span><kbd className="px-1 py-0.5 rounded bg-slate-800/60 text-slate-600 border border-slate-700/40 mr-1">↑↓</kbd>navigate</span>
                <span><kbd className="px-1 py-0.5 rounded bg-slate-800/60 text-slate-600 border border-slate-700/40 mr-1">↵</kbd>select</span>
                <span><kbd className="px-1 py-0.5 rounded bg-slate-800/60 text-slate-600 border border-slate-700/40 mr-1">esc</kbd>close</span>
                <span className="ml-auto text-slate-800">⌘K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
