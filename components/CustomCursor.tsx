"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // assume touch until checked client-side

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 50 });
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    // Only show custom cursor on pointer devices
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      const el = e.target as HTMLElement;
      setIsPointer(el.closest("a, button, [data-cursor='pointer'], input, textarea, select, label") !== null);
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full border border-indigo-400/50 transition-[width,height,opacity] duration-200"
        style={{
          x: ringX, y: ringY, translateX: "-50%", translateY: "-50%",
          width: isPointer ? 52 : 36, height: isPointer ? 52 : 36,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer ? "rgba(167,139,250,0.7)" : "rgba(99,102,241,0.5)",
          scale: isClicking ? 0.85 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full bg-indigo-400 transition-[width,height,opacity] duration-150"
        style={{
          x: dotX, y: dotY, translateX: "-50%", translateY: "-50%",
          width: isPointer ? 8 : 6, height: isPointer ? 8 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "#c084fc" : "#818cf8",
          scale: isClicking ? 0.6 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9998 rounded-full"
        style={{
          x: ringX, y: ringY, translateX: "-50%", translateY: "-50%",
          width: 36, height: 36,
          opacity: isVisible ? 0.12 : 0,
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />
    </>
  );
}
