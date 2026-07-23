"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT = [
  "Initializing portfolio...",
  "Loading backend systems",
  "Mounting AI integrations",
  "Compiling Fluree work",
  "Ready.",
];

export default function Loader() {
  const [show,      setShow]      = useState(true);
  const [progress,  setProgress]  = useState(0);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    // Skip on subsequent visits
    if (sessionStorage.getItem("owais-loaded")) {
      setShow(false);
      return;
    }

    let p = 0;
    let dismissed = false;

    // Boot lines
    const lineTimers = BOOT.map((_, i) =>
      window.setTimeout(() => setLineCount(i + 1), 200 + i * 200)
    );

    // Progress
    const iv = window.setInterval(() => {
      p = Math.min(p + Math.random() * 14 + 4, 100);
      setProgress(p);
      if (p >= 100) window.clearInterval(iv);
    }, 80);

    // Dismiss
    const dismiss = window.setTimeout(() => {
      if (dismissed) return;
      dismissed = true;
      setShow(false);
      sessionStorage.setItem("owais-loaded", "1");
    }, 2500);

    return () => {
      dismissed = true;
      lineTimers.forEach(window.clearTimeout);
      window.clearInterval(iv);
      window.clearTimeout(dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#020617",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15,
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.3) 3px,rgba(0,0,0,0.3) 4px)",
          }} />

          {/* Glow */}
          <div style={{
            position: "absolute", width: 500, height: 500,
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%)",
            filter: "blur(50px)", pointerEvents: "none",
          }} />

          {/* Logo */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display font-bold gradient-text"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: 40, position: "relative" }}
          >
            {"<Owais />"}
          </motion.p>

          {/* Boot lines */}
          <div style={{ fontFamily: "monospace", fontSize: 12, marginBottom: 32, width: 240, position: "relative" }}>
            {BOOT.slice(0, lineCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
              >
                <span style={{ color: "#4ade80" }}>✓</span>
                <span style={{ color: i === lineCount - 1 ? "#e2e8f0" : "#1e293b" }}>{line}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <div style={{ width: 240, height: 2, background: "#0f172a", borderRadius: 9999, overflow: "hidden", position: "relative" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,#6366f1,#8b5cf6,#22d3ee)",
              boxShadow: "0 0 8px rgba(99,102,241,0.7)",
              borderRadius: 9999,
              transition: "width 0.1s ease-out",
            }} />
          </div>
          <p style={{ marginTop: 12, fontFamily: "monospace", fontSize: 10, color: "#1e293b", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
