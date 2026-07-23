"use client";

import { useEffect, useRef } from "react";

const TAGS = [
  { label: "Node.js",     color: "#68a063" },
  { label: "Python",      color: "#3776ab" },
  { label: "FastAPI",     color: "#009688" },
  { label: "React.js",    color: "#61dafb" },
  { label: "Next.js",     color: "#ffffff" },
  { label: "PostgreSQL",  color: "#336791" },
  { label: "Express.js",  color: "#68a063" },
  { label: "Airflow",     color: "#017cee" },
  { label: "OAuth 2.0",   color: "#f43f5e" },
  { label: "Claude AI",   color: "#d4a574" },
  { label: "REST APIs",   color: "#f59e0b" },
  { label: "TypeScript",  color: "#3178c6" },
  { label: "Git",         color: "#f05032" },
  { label: "Keycloak",    color: "#4d9fe0" },
  { label: "Docker",      color: "#2496ed" },
  { label: "Prompt Eng.", color: "#a78bfa" },
  { label: "ETL",         color: "#22d3ee" },
  { label: "Django",      color: "#092e20" },
];

const RADIUS = 130;

// Fibonacci sphere distribution
function fibonacciSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

const BASE_POINTS = fibonacciSphere(TAGS.length);

// Pre-compute CSS transform for each tag position
const TAG_TRANSFORMS = BASE_POINTS.map(([x, y, z]) => {
  const az = Math.atan2(z, x) * (180 / Math.PI);
  const el = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
  return `rotateY(${az.toFixed(1)}deg) rotateX(${(-el).toFixed(1)}deg) translateZ(${RADIUS}px)`;
});

export default function TechGlobe() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const rotXRef    = useRef(20);
  const rotYRef    = useRef(0);
  const velXRef    = useRef(0);
  const velYRef    = useRef(0.3);
  const dragRef    = useRef<{ active: boolean; lx: number; ly: number }>({ active: false, lx: 0, ly: 0 });

  useEffect(() => {
    const el = spinnerRef.current;
    if (!el) return;

    const loop = () => {
      if (!dragRef.current.active) {
        velYRef.current *= 0.98;
        velXRef.current *= 0.98;
        rotYRef.current += 0.3 + velYRef.current;
        rotXRef.current += velXRef.current;
        rotXRef.current = Math.max(-35, Math.min(35, rotXRef.current));
      }
      el.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onDown = (e: MouseEvent | TouchEvent) => {
      const pt = "touches" in e ? e.touches[0] : e;
      dragRef.current = { active: true, lx: pt.clientX, ly: pt.clientY };
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current.active) return;
      const pt = "touches" in e ? e.touches[0] : e;
      const dx = pt.clientX - dragRef.current.lx;
      const dy = pt.clientY - dragRef.current.ly;
      velYRef.current = dx * 0.3;
      velXRef.current = -dy * 0.3;
      rotYRef.current += dx * 0.5;
      rotXRef.current = Math.max(-35, Math.min(35, rotXRef.current - dy * 0.5));
      dragRef.current.lx = pt.clientX;
      dragRef.current.ly = pt.clientY;
    };
    const onUp = () => { dragRef.current.active = false; };

    el.parentElement?.addEventListener("mousedown",  onDown as EventListener);
    el.parentElement?.addEventListener("touchstart", onDown as EventListener, { passive: true });
    window.addEventListener("mousemove",  onMove as EventListener);
    window.addEventListener("touchmove",  onMove as EventListener, { passive: true });
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchend",  onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.parentElement?.removeEventListener("mousedown",  onDown as EventListener);
      el.parentElement?.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("mousemove",  onMove as EventListener);
      window.removeEventListener("touchmove",  onMove as EventListener);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchend",  onUp);
    };
  }, []);

  return (
    <div
      className="relative mx-auto my-8 cursor-grab active:cursor-grabbing select-none"
      style={{ width: 320, height: 320, perspective: "700px" }}
    >
      <div
        ref={spinnerRef}
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
      >
        {TAGS.map((tag, i) => (
          <div
            key={tag.label}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: TAG_TRANSFORMS[i],
              transformStyle: "preserve-3d",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: "translate(-50%, -50%)",
                padding: "4px 10px",
                borderRadius: 9999,
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: 600,
                color: tag.color,
                background: `${tag.color}18`,
                border: `1px solid ${tag.color}40`,
                whiteSpace: "nowrap",
                boxShadow: `0 0 10px ${tag.color}20`,
                backdropFilter: "blur(4px)",
              }}
            >
              {tag.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
