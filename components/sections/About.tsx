"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Database, Cpu, MapPin, Coffee, Zap } from "lucide-react";
import ScrambleText from "../ScrambleText";
import GithubHeatmap from "../GithubHeatmap";

function AnimatedCounter({ value, color, inView }: { value: string; color: string; inView: boolean }) {
  const match  = value.match(/^(\d+)(\D*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [count, setCount] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur   = 1400;
    const tick  = (now: number) => {
      const t      = Math.min((now - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target]);

  return <span style={{ color }}>{count}{suffix}</span>;
}

const stats = [
  { value: "10+",  label: "Months at Fluree",    color: "#818cf8" },
  { value: "3",    label: "Roles & Internships", color: "#c084fc" },
  { value: "5+",   label: "IBM Certifications",  color: "#22d3ee" },
  { value: "2025", label: "MCA Graduate · AMU",  color: "#f472b6" },
];

const services = [
  {
    icon: Server,
    title: "Backend APIs",
    desc: "High-performance RESTful APIs with Node.js, Express and FastAPI — built for scale and reliability.",
    color: "#818cf8",
    gradient: "from-indigo-500/10 to-violet-500/5",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    desc: "End-to-end ETL pipelines with Python and Apache Airflow for reliable, low-latency data ingestion.",
    color: "#22d3ee",
    gradient: "from-cyan-500/10 to-blue-500/5",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    desc: "Integrating AI solutions like Claude to automate reporting at scale and improve data visibility.",
    color: "#f472b6",
    gradient: "from-pink-500/10 to-rose-500/5",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" as const } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full opacity-5"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)", filter: "blur(40px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">About Me</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Who I <ScrambleText text="Am" trigger={inView} className="gradient-text" delay={200} />
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {/* Bio card */}
          <motion.div variants={fadeUp} className="lg:col-span-2 glass glow-border rounded-2xl p-8 holographic">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Coffee className="text-indigo-400" size={22} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl mb-1 text-slate-100">The Story So Far</h3>
                <p className="text-slate-400 text-sm">Software Engineer · Backend · AI Systems</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              I&apos;m a <span className="text-indigo-300 font-medium">Software Engineer at Fluree</span> working on
              production-scale systems at the intersection of data, backend, and AI. Experienced in building and
              scaling APIs, data pipelines, and distributed systems using Node.js and modern data technologies.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              MCA (2025) graduate from <span className="text-cyan-300 font-medium">Aligarh Muslim University</span> with
              a background in Mathematics, bringing analytical thinking to complex engineering problems. Passionate
              about building systems that turn data into actionable insights and drive meaningful impact.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Node.js", "Python", "FastAPI", "PostgreSQL", "Apache Airflow", "Keycloak", "Claude AI"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-800/70 text-indigo-300 border border-indigo-500/15">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Location + availability */}
          <motion.div variants={fadeUp} className="glass glow-border rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={18} className="text-cyan-400" />
              <span className="text-sm">Based in <span className="text-slate-100 font-medium">New Delhi, India</span></span>
            </div>
            <div className="h-px bg-slate-700/40" />
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] shrink-0 animate-pulse" />
              <span className="text-emerald-300 text-sm font-medium">Open to opportunities</span>
            </div>
            <div className="h-px bg-slate-700/40" />
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-slate-300 text-sm">Performance-first · Production-proven</span>
            </div>
            <div className="mt-auto flex items-end justify-between gap-1 h-14 px-1">
              {[60, 85, 70, 95, 80, 90, 75].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-5 rounded-sm"
                  style={{ background: `linear-gradient(to top, #6366f1, #8b5cf6)`, opacity: 0.5 + i * 0.07 }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : { height: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </div>
            <p className="text-slate-500 text-xs font-mono text-center mt-2">weekly commit activity</p>
          </motion.div>

          {/* Stats */}
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} className="glass glow-border rounded-2xl p-6 text-center holographic">
              <motion.p
                className="font-display font-bold text-3xl mb-1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, type: "spring" }}
              >
                <AnimatedCounter value={stat.value} color={stat.color} inView={inView} />
              </motion.p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}

          {/* Services */}
          {services.map((svc) => (
            <motion.div key={svc.title} variants={fadeUp} className={`glass glow-border rounded-2xl p-6 bg-linear-to-br ${svc.gradient} holographic`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                <svc.icon size={20} style={{ color: svc.color }} />
              </div>
              <h3 className="font-display font-semibold text-slate-100 mb-2">{svc.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 glass glow-border rounded-2xl p-6"
        >
          <GithubHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
