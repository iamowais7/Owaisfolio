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
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const isLight = mounted && theme === "light";

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const show = setTimeout(() => setShowPopup(true), 2000);
    const hide = setTimeout(() => setShowPopup(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (open) {
      setHasOpened(true);
      setShowPopup(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "circOut" as const }}
            className="fixed bottom-24 right-4 sm:right-6 z-55 w-[92vw] sm:w-95 flex flex-col rounded-2xl overflow-hidden"
            style={{
              height: "min(520px, 75vh)",
              background: "rgba(8,12,28,0.96)",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
              backdropFilter: "blur(32px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 border-b border-slate-700/40"
              style={{ background: "rgba(99,102,241,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 14px rgba(99,102,241,0.45)" }}
                >
                  <Bot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-100 text-sm font-semibold font-display leading-none">Ask about Owais</p>
                  <p className="text-emerald-400 text-[10px] font-mono mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    AI · Powered by Groq
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors"
                    title="Clear chat"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.2) transparent" }}
            >
              {/* Welcome state */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex gap-3">
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                      <Bot size={13} className="text-white" />
                    </div>
                    <div
                      className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-200 leading-relaxed"
                      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}
                    >
                      Hey! 👋 I&apos;m Owais&apos;s AI assistant. Ask me anything about his skills, experience, projects, or availability.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-500 text-xs font-mono px-1">Try asking:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setInput(s)}
                          className="text-left text-xs px-3 py-2 rounded-xl text-indigo-300 transition-all duration-200 hover:scale-[1.02]"
                          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(99,102,241,0.14)";
                            e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(99,102,241,0.07)";
                            e.currentTarget.style.borderColor = "rgba(99,102,241,0.18)";
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Conversation */}
              {messages.map((m) => {
                const text = getMessageText(m.parts as Array<{ type: string; text?: string }>);
                if (!text || m.role === "system") return null;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {m.role === "assistant" && (
                      <div
                        className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                      >
                        <Bot size={13} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user" ? "rounded-tr-sm text-white" : "rounded-tl-sm text-slate-200"
                      }`}
                      style={
                        m.role === "user"
                          ? { background: "linear-gradient(135deg, #6366f1, #7c3aed)", boxShadow: "0 2px 12px rgba(99,102,241,0.3)" }
                          : { background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }
                      }
                    >
                      {text}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    <Bot size={13} className="text-white" />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 border-t border-slate-700/40 flex items-center gap-2"
              style={{ background: "rgba(0,0,0,0.25)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Owais…"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none px-2 py-1.5"
                disabled={isLoading}
              />
              <motion.button
                onClick={submit}
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Send size={13} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro popup bubble */}
      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.22, ease: "circOut" as const }}
            className="fixed bottom-24 right-4 sm:right-6 z-55 max-w-55 pointer-events-none"
          >
            <div
              className="relative px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium leading-snug"
              style={isLight ? {
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                backdropFilter: "blur(20px)",
                color: "#1e293b",
              } : {
                background: "rgba(8,12,28,0.95)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08)",
                backdropFilter: "blur(20px)",
                color: "#f1f5f9",
              }}
            >
              👋 I&apos;m managing Owais — let&apos;s talk!
              {/* Tail */}
              <span
                className="absolute -bottom-2 right-5 w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `8px solid ${isLight ? "rgba(255,255,255,0.97)" : "rgba(8,12,28,0.95)"}`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 sm:right-6 z-55 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open ? "rgba(30,27,75,0.9)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: open
            ? "0 0 0 2px rgba(99,102,241,0.4)"
            : "0 0 0 3px rgba(99,102,241,0.25), 0 8px 32px rgba(99,102,241,0.45)",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "spark"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={20} className="text-indigo-300" /> : <Sparkles size={20} className="text-white" />}
          </motion.span>
        </AnimatePresence>

        {/* Pulse ring — only before first open */}
        {!open && !hasOpened && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(99,102,241,0.5)" }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
