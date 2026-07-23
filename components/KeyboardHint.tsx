"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Command } from "lucide-react";

export default function KeyboardHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hint-seen")) return;

    // Show after loader finishes
    const show = window.setTimeout(() => setShow(true), 3000);

    // Auto dismiss
    const hide = window.setTimeout(() => dismiss(), 10000);

    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("hint-seen", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{    opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: "circOut" as const }}
          style={{
            position: "fixed",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(6,9,30,0.96)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            whiteSpace: "nowrap",
          }}>

            {/* Terminal */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Terminal size={13} color="#4ade80" />
              </div>
              <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>Hacker terminal</span>
              <kbd style={{
                fontFamily: "monospace", fontSize: 11,
                padding: "2px 7px", borderRadius: 6,
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.25)",
                color: "#4ade80",
              }}>`</kbd>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 18, background: "rgba(100,116,139,0.3)" }} />

            {/* Palette */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Command size={13} color="#818cf8" />
              </div>
              <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>Command palette</span>
              <kbd style={{
                fontFamily: "monospace", fontSize: 11,
                padding: "2px 7px", borderRadius: 6,
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#818cf8",
              }}>Ctrl K</kbd>
            </div>

            {/* Close */}
            <button
              onClick={dismiss}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#334155", padding: 2, marginLeft: 4 }}
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
