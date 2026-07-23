"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 45%, #22d3ee 100%)",
        boxShadow: "0 0 12px rgba(99,102,241,0.8), 0 0 4px rgba(34,211,238,0.5)",
      }}
    />
  );
}
