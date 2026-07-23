"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import ScrambleText from "../ScrambleText";

const experiences = [
  {
    company:    "Fluree",
    role:       "Software Development Engineer",
    duration:   "November 2025 – Present",
    location:   "Delhi, India (Remote)",
    type:       "Full-time",
    current:    true,
    color:      "#818cf8",
    desc: "Working on an AI-powered database, building and scaling backend systems, data pipelines, and intelligent integrations for production use. Designing high-performance RESTful APIs and developing ETL pipelines with Python and Apache Airflow.",
    highlights: [
      "Designed high-performance RESTful APIs using Node.js",
      "Built ETL pipelines with Python & Apache Airflow for low-latency ingestion",
      "Implemented secure auth using Keycloak, OAuth 2.0 and RBAC",
      "Integrated Claude AI to automate reporting at scale",
      "Focused on performance, scalability, and system reliability",
    ],
    tags: ["Node.js", "Python", "Airflow", "Keycloak", "OAuth 2.0", "Claude AI", "PostgreSQL"],
  },
  {
    company:    "Fluree",
    role:       "Software Trainee",
    duration:   "August 2025 – October 2025",
    location:   "Delhi, India (Remote)",
    type:       "Trainee",
    current:    false,
    color:      "#22d3ee",
    desc: "Backend contributor at a product-based company, contributing to the development of an AI-powered database using Node.js. Gained deep hands-on experience in production backend systems and modern data technologies.",
    highlights: [
      "Contributed to AI-powered database product development",
      "Developed backend features using Node.js",
      "Worked closely with senior engineers on scalable system design",
    ],
    tags: ["Node.js", "Backend", "AI Database", "REST APIs"],
  },
  {
    company:    "FEXLE Services Pvt. Ltd.",
    role:       "Summer Intern",
    duration:   "June 2024 – November 2024",
    location:   "Jaipur, India",
    type:       "Internship",
    current:    false,
    color:      "#f472b6",
    desc: "Salesforce-based internship where I gained exposure to CRM development, Salesforce platform development, and enterprise-level application workflows.",
    highlights: [
      "Hands-on Salesforce platform development",
      "Gained experience in CRM customization and workflows",
    ],
    tags: ["Salesforce", "CRM", "Apex", "LWC"],
  },
];

function ExperienceCard({ exp, index, inView }: { exp: (typeof experiences)[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: "circOut" as const }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-slate-900 z-10 hidden md:block"
        style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}80` }}
      />

      <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"}`}>
        <div className="glass glow-border rounded-2xl p-6 holographic">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: exp.color, background: `${exp.color}18`, border: `1px solid ${exp.color}25` }}>
                  {exp.type}
                </span>
                {exp.current && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Current
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-100">{exp.role}</h3>
              <p className="font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-slate-400 text-sm font-mono">{exp.duration}</p>
              <p className="text-slate-500 text-xs mt-1 flex items-center justify-end gap-1">
                <ExternalLink size={11} />
                {exp.location}
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.desc}</p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors mb-3"
          >
            <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }} />
            {expanded ? "Hide highlights" : "Show highlights"}
          </button>

          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 space-y-1.5"
            >
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span style={{ color: exp.color }} className="mt-1 shrink-0">›</span>
                  {h}
                </li>
              ))}
            </motion.ul>
          )}

          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/70 text-slate-400 border border-slate-700/40">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-tag mb-4 inline-flex"><Briefcase size={12} />Work History</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Work <ScrambleText text="Experience" trigger={inView} className="gradient-text" delay={200} />
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block overflow-hidden">
            <motion.div
              style={{ background: "linear-gradient(to bottom, #6366f1, #8b5cf6, #22d3ee, transparent)" }}
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <ExperienceCard key={`${exp.company}-${i}`} exp={exp} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
