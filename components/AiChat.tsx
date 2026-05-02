"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, RotateCcw } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useTheme } from "next-themes";

const SUGGESTIONS = [
  "What's his tech stack?",
  "Tell me about his projects",
  "Is he open to opportunities?",
  "What does he do at Fluree?",
];

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function AiChat() {
  const [open, setOpen]           = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [input, setInput]         = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const L = mounted && theme === "light"; // shorthand: L = isLight

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  useEffect(() => {
    const show = setTimeout(() => setShowPopup(true), 2000);
    const hide = setTimeout(() => setShowPopup(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (open) { setHasOpened(true); setShowPopup(false); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  // ── Theme-aware style tokens ──
  const panelBg     = L ? "rgba(255,255,255,0.97)"    : "rgba(8,12,28,0.96)";
  const panelBorder = L ? "rgba(99,102,241,0.25)"     : "rgba(99,102,241,0.25)";
  const panelShadow = L ? "0 24px 80px rgba(0,0,0,0.15)" : "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.04)";
  const headerBg    = L ? "rgba(99,102,241,0.06)"     : "rgba(99,102,241,0.07)";
  const headerBorder= L ? "rgba(99,102,241,0.15)"     : "rgba(148,163,184,0.15)";
  const titleColor  = L ? "#1e293b"                   : "#f1f5f9";
  const btnHover    = L ? "rgba(99,102,241,0.08)"     : "rgba(148,163,184,0.1)";
  const btnColor    = L ? "#64748b"                   : "#64748b";
  const bubbleBg    = L ? "rgba(99,102,241,0.07)"     : "rgba(99,102,241,0.1)";
  const bubbleBorder= L ? "rgba(99,102,241,0.2)"      : "rgba(99,102,241,0.15)";
  const bubbleText  = L ? "#334155"                   : "#e2e8f0";
  const tryText     = L ? "#94a3b8"                   : "#64748b";
  const suggBg      = L ? "rgba(99,102,241,0.06)"     : "rgba(99,102,241,0.07)";
  const suggBorder  = L ? "rgba(99,102,241,0.2)"      : "rgba(99,102,241,0.18)";
  const suggText    = L ? "#4f46e5"                   : "#a5b4fc";
  const inputAreaBg = L ? "rgba(248,250,252,0.9)"     : "rgba(0,0,0,0.25)";
  const inputBorder = L ? "rgba(99,102,241,0.15)"     : "rgba(148,163,184,0.1)";
  const inputText   = L ? "#1e293b"                   : "#e2e8f0";
  const inputPH     = L ? "#94a3b8"                   : "#475569";

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "circOut" as const }}
            className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-55 w-[92vw] sm:w-95 flex flex-col rounded-2xl overflow-hidden"
            style={{ height: "min(520px, 75vh)", background: panelBg, border: `1px solid ${panelBorder}`, boxShadow: panelShadow, backdropFilter: "blur(32px)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5"
              style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 14px rgba(99,102,241,0.45)" }}>
                  <Bot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold font-display leading-none" style={{ color: titleColor }}>Ask about Owais</p>
                  <p className="text-emerald-500 text-[10px] font-mono mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    AI · Powered by Groq
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button onClick={() => setMessages([])}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: btnColor }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = btnHover; e.currentTarget.style.color = titleColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = btnColor; }}
                    title="Clear chat">
                    <RotateCcw size={13} />
                  </button>
                )}
                <button onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: btnColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = btnHover; e.currentTarget.style.color = titleColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = btnColor; }}>
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.2) transparent" }}>

              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                      <Bot size={13} className="text-white" />
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
                      style={{ background: bubbleBg, border: `1px solid ${bubbleBorder}`, color: bubbleText }}>
                      Hey! 👋 I&apos;m Owais&apos;s AI assistant. Ask me anything about his skills, experience, projects, or availability.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono px-1" style={{ color: tryText }}>Try asking:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button key={s} onClick={() => setInput(s)}
                          className="text-left text-xs px-3 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                          style={{ background: suggBg, border: `1px solid ${suggBorder}`, color: suggText }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = L ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.14)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = suggBg; }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((m) => {
                const text = getMessageText(m.parts as Array<{ type: string; text?: string }>);
                if (!text || m.role === "system") return null;
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {m.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                        <Bot size={13} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                      style={m.role === "user"
                        ? { background: "linear-gradient(135deg, #6366f1, #7c3aed)", color: "#fff", boxShadow: "0 2px 12px rgba(99,102,241,0.3)" }
                        : { background: bubbleBg, border: `1px solid ${bubbleBorder}`, color: bubbleText }}>
                      {text}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
                    style={{ background: bubbleBg, border: `1px solid ${bubbleBorder}` }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 flex items-center gap-2"
              style={{ background: inputAreaBg, borderTop: `1px solid ${inputBorder}` }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Owais…"
                className="flex-1 bg-transparent text-sm outline-none px-2 py-1.5"
                style={{ color: inputText, caretColor: "#6366f1" }}
                disabled={isLoading}
              />
              <motion.button onClick={submit} disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Send size={13} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Intro popup ── */}
      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }} transition={{ duration: 0.22, ease: "circOut" as const }}
            className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-55 max-w-55 pointer-events-none"
          >
            <div className="relative px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium leading-snug"
              style={L ? {
                background: "rgba(255,255,255,0.97)", border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)", backdropFilter: "blur(20px)", color: "#1e293b",
              } : {
                background: "rgba(8,12,28,0.95)", border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", color: "#f1f5f9",
              }}>
              👋 I&apos;m managing Owais — let&apos;s talk!
              <span className="absolute -bottom-2 right-5 w-0 h-0"
                style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                  borderTop: `8px solid ${L ? "rgba(255,255,255,0.97)" : "rgba(8,12,28,0.95)"}` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-55 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open ? (L ? "rgba(238,240,255,0.95)" : "rgba(30,27,75,0.9)") : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: open ? "0 0 0 2px rgba(99,102,241,0.4)" : "0 0 0 3px rgba(99,102,241,0.25), 0 8px 32px rgba(99,102,241,0.45)",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "spark"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
            {open ? <X size={20} className="text-indigo-500" /> : <Sparkles size={20} className="text-white" />}
          </motion.span>
        </AnimatePresence>
        {!open && !hasOpened && (
          <motion.span className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(99,102,241,0.5)" }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
        )}
      </motion.button>
    </>
  );
}
