"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 180, damping: 14 });
  const ySpring = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width  / 2) * strength);
    y.set((e.clientY - rect.top  - rect.height / 2) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
