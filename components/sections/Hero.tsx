"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, ExternalLink } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import ParticleCanvas from "../ParticleCanvas";

const ROLES = [
  "Software Engineer @ Fluree",
  "Backend Systems Builder",
  "Data Pipeline Architect",
  "AI Integration Specialist",
  "MCA Graduate · AMU 2025",
];

function useTypewriter(texts: string[], speed = 80, deleteSpeed = 45, pauseMs = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseMs);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, texts, speed, deleteSpeed, pauseMs]);
  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "circOut" as const } },
};

export default function Hero() {
  const typedRole = useTypewriter(ROLES);
  const scrollToNext = () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 noise-overlay"
    >
      <ParticleCanvas />

      {/* Aurora orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)", filter: "blur(40px)", animation: "float 10s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 600, height: 600, bottom: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 65%)", filter: "blur(50px)", animation: "float-alt 13s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, top: "30%", left: "40%", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 65%)", filter: "blur(60px)", animation: "float-alt2 16s ease-in-out infinite" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: text */}
          <motion.div className="flex-1 max-w-2xl" variants={container} initial="hidden" animate="show">
            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="section-tag">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Software Engineer @ Fluree · Open to Opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="text-slate-400 font-mono text-xs mb-3 tracking-widest uppercase">
              Hello, world! I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-display font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
            >
              <span className="gradient-text">Mohammad</span>
              <br />
              <span className="text-slate-100">Owais Khan</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item} className="flex items-center gap-2 mb-6 h-9">
              <span className="text-slate-500 font-mono text-sm">~$</span>
              <span className="text-violet-300 font-mono text-base font-medium">{typedRole}</span>
              <span className="typewriter-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p variants={item} className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
              Building production-scale systems at the intersection of{" "}
              <span className="text-indigo-300 font-medium">data, backend, and AI</span> at Fluree.
              I design high-performance APIs, reliable ETL pipelines, and intelligent integrations
              that actually ship.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={16} />
                View My Work
              </motion.a>
              <motion.a
                href="/Owais_Khan_Resume.pdf"
                download
                className="btn-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
              {[
                { icon: FiGithub,    href: "https://github.com/iamowais7",                         label: "GitHub"    },
                { icon: FiLinkedin,  href: "https://www.linkedin.com/in/iamosk",                   label: "LinkedIn"  },
                { icon: FiTwitter,   href: "https://x.com/iamosk_",                                label: "Twitter"   },
                { icon: FiInstagram, href: "https://www.instagram.com/iamosk_/",                   label: "Instagram" },
                { icon: SiLeetcode, href: "https://github.com/iamowais7/Gfg-Leetcode",             label: "LeetCode"  },
                { icon: Mail,        href: "mailto:khan.owais0555@gmail.com",                       label: "Email"     },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 border border-slate-700/40 transition-colors duration-200"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: avatar */}
          <motion.div
            className="flex flex-col items-center gap-5 shrink-0"
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "circOut" as const }}
          >
            {/* Photo + floating badges wrapper */}
            <div className="relative" style={{ width: "clamp(220px, 65vw, 290px)", height: "clamp(220px, 65vw, 290px)" }}>
              {/* Spinning gradient ring */}
              <div
                className="absolute rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #6366f1, #8b5cf6, #22d3ee, #ec4899, #6366f1)",
                  borderRadius: "50%",
                  animation: "spin 8s linear infinite",
                  width: "calc(100% + 8px)",
                  height: "calc(100% + 8px)",
                  top: -4, left: -4,
                }}
              />
              {/* Photo */}
              <div
                className="relative rounded-full overflow-hidden w-full h-full"
                style={{ boxShadow: "0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(99,102,241,0.12)" }}
              >
                <Image
                  src="/owais.jpeg"
                  alt="Mohammad Owais Khan"
                  fill
                  sizes="(max-width: 768px) 50vw, 290px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badges — desktop only */}
              {[
                { label: "Node.js",   color: "#68a063", top: "5%",    right: "-25%", dur: 3.2 },
                { label: "Python",    color: "#3776ab", bottom: "15%", right: "-28%", dur: 3.8 },
                { label: "Fluree",    color: "#818cf8", top: "40%",   left: "-28%",  dur: 4.1 },
                { label: "FastAPI",   color: "#009688", bottom: "5%",  left: "-18%",  dur: 3.5 },
                { label: "REST API",  color: "#f59e0b", top: "20%",   right: "-30%", dur: 4.4 },
                { label: "React.js",  color: "#61dafb", bottom: "35%", left: "-30%",  dur: 3.9 },
                { label: "OAuth 2.0", color: "#f43f5e", top: "5%",    left: "-30%",  dur: 4.6 },
              ].map(({ label, color, dur, ...pos }) => (
                <motion.div
                  key={label}
                  className="absolute px-3 py-1.5 rounded-full glass border text-xs font-mono font-semibold hidden lg:block"
                  style={{ ...pos, color, borderColor: `${color}33`, boxShadow: `0 0 12px ${color}22` }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
                >
                  {label}
                </motion.div>
              ))}
            </div>

            {/* Tech badges — mobile only, shown as a grid below photo */}
            <div className="flex flex-wrap justify-center gap-2 lg:hidden mb-16">
              {[
                { label: "Node.js",   color: "#68a063" },
                { label: "Python",    color: "#3776ab" },
                { label: "Fluree",    color: "#818cf8" },
                { label: "FastAPI",   color: "#009688" },
                { label: "REST API",  color: "#f59e0b" },
                { label: "React.js",  color: "#61dafb" },
                { label: "OAuth 2.0", color: "#f43f5e" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full glass border text-xs font-mono font-semibold"
                  style={{ color, borderColor: `${color}33`, boxShadow: `0 0 10px ${color}22` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
