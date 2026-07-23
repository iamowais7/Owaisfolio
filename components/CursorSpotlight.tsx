"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tx = -999, ty = -999;
    let cx = -999, cy = -999;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      // Smooth lag — spotlight trails behind cursor
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[2]"
      style={{
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.055) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
