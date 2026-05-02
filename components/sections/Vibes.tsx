"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const GRADIENTS = [
  "from-orange-500/20 via-red-500/10 to-rose-500/5",
  "from-amber-500/20 via-yellow-500/10 to-orange-500/5",
  "from-violet-500/20 via-indigo-500/10 to-blue-500/5",
  "from-green-500/20 via-emerald-500/10 to-teal-500/5",
  "from-lime-500/20 via-green-500/10 to-emerald-500/5",
  "from-teal-500/20 via-cyan-500/10 to-sky-500/5",
  "from-sky-500/20 via-blue-500/10 to-indigo-500/5",
  "from-pink-500/20 via-rose-500/10 to-fuchsia-500/5",
  "from-yellow-500/20 via-orange-500/10 to-red-500/5",
];

const ACCENTS = [
  "#f97316", "#f59e0b", "#7c3aed",
  "#22c55e", "#84cc16", "#14b8a6",
  "#0ea5e9", "#ec4899", "#eab308",
];

type MediaFile = { src: string; type: "video" | "image" };

function VibeCard({ file, index, inView }: { file: MediaFile; index: number; inView: boolean }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const accent   = ACCENTS[index % ACCENTS.length];
  const isMov    = file.src.toLowerCase().endsWith(".mov");
  const [hovered, setHovered] = useState(false);

  const mediaStyle: React.CSSProperties = {
    transition: "filter 0.4s ease, transform 0.4s ease",
    filter:    hovered ? "blur(0px)" : "blur(6px)",
    transform: hovered ? "scale(1)"  : "scale(1.08)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "circOut" as const }}
      className="relative rounded-2xl overflow-hidden cursor-pointer shrink-0"
      style={{ width: 240 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`aspect-9/16 w-full bg-linear-to-br ${gradient} relative overflow-hidden glass border border-slate-700/30`}>
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${accent}30 0%, transparent 70%)` }}
        />

        {file.type === "image" && (
          <Image
            src={file.src}
            alt=""
            fill
            sizes="240px"
            className="object-cover"
            style={mediaStyle}
          />
        )}

        {file.type === "video" && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={mediaStyle}
            loop muted playsInline
            onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
            onMouseLeave={(e) => { (e.currentTarget as HTMLVideoElement).pause(); }}
          >
            {isMov
              ? <source src={file.src} type="video/quicktime" />
              : <source src={file.src} type="video/mp4" />
            }
          </video>
        )}
      </div>
    </motion.div>
  );
}

export default function Vibes() {
  const ref     = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(setFiles)
      .catch(() => {});
  }, []);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    return () => el?.removeEventListener("scroll", updateArrows);
  }, [files]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" });
  };

  return (
    <section id="vibes" ref={ref} className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="section-tag mb-4 inline-flex font-mono text-base"
            style={{ color: "#f97316", background: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.2)" }}
          >
            {"while(alive) { vibe(); }"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Beyond the{" "}
            <span style={{ background: "linear-gradient(135deg, #f97316, #22c55e, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Terminal
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm font-mono">
            {"// when the IDE is closed, life.exe is running"}
          </p>
        </motion.div>

        {/* Carousel */}
        {files.length > 0 ? (
          <div className="relative mb-14">
            {/* Left arrow */}
            <motion.button
              onClick={() => scroll("left")}
              animate={{ opacity: canLeft ? 1 : 0, pointerEvents: canLeft ? "auto" : "none" }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(8,12,35,0.85)",
                border: "1px solid rgba(99,102,241,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <ChevronLeft size={18} className="text-slate-300" />
            </motion.button>

            {/* Scroll track */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {files.map((file, i) => (
                <VibeCard key={file.src} file={file} index={i} inView={inView} />
              ))}
            </div>

            {/* Right arrow */}
            <motion.button
              onClick={() => scroll("right")}
              animate={{ opacity: canRight ? 1 : 0, pointerEvents: canRight ? "auto" : "none" }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(8,12,35,0.85)",
                border: "1px solid rgba(99,102,241,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <ChevronRight size={18} className="text-slate-300" />
            </motion.button>
          </div>
        ) : (
          <div className="text-center text-slate-600 font-mono text-sm mb-14 py-20">
            Drop files in <span className="text-indigo-400">public/videos/</span> or <span className="text-indigo-400">public/vibes/</span> to see them here.
          </div>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass glow-border rounded-2xl p-8 max-w-md mx-auto holographic">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="font-display font-semibold text-slate-100 text-lg mb-2">See More on Instagram</h3>
            <p className="text-slate-400 text-sm mb-6">Unfiltered moments, rides &amp; cue sessions</p>
            <motion.a
              href="https://www.instagram.com/iamosk_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", boxShadow: "0 0 25px rgba(220,39,67,0.35)" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(220,39,67,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <FiInstagram size={18} />
              Follow @iamosk_
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
