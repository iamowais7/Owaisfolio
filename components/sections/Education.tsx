"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import ScrambleText from "../ScrambleText";

const education = [
  {
    degree:      "Master of Computer Applications (MCA)",
    institution: "Aligarh Muslim University",
    duration:    "August 2023 – July 2025",
    location:    "Aligarh, Uttar Pradesh",
    field:       "Computer and Information Sciences",
    highlights:  ["Graduated 2025", "Specialization in Backend Systems & Data Engineering", "Strong foundation in algorithms and distributed systems"],
    color:       "#818cf8",
  },
  {
    degree:      "Bachelor of Science — Mathematics",
    institution: "Aligarh Muslim University",
    duration:    "August 2020 – July 2023",
    location:    "Aligarh, Uttar Pradesh",
    field:       "Mathematics",
    highlights:  ["Background in pure mathematics and analytical thinking", "Brings problem-solving rigor to engineering challenges"],
    color:       "#22d3ee",
  },
];

const certifications = [
  { name: "Short Term Training Program in Artificial Intelligence & Machine Learning", issuer: "AMU",            year: "2024", color: "#f97316" },
  { name: "Python for Data Science, AI & Development",                                issuer: "IBM / Coursera", year: "2024", color: "#3776ab" },
  { name: "Introduction to Data Analytics",                                           issuer: "IBM / Coursera", year: "2024", color: "#006699" },
  { name: "Data Visualization & Dashboards with Excel & Cognos",                     issuer: "IBM / Coursera", year: "2024", color: "#054ada" },
  { name: "Excel Basics for Data Analysis",                                           issuer: "IBM / Coursera", year: "2024", color: "#21a366" },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute right-0 bottom-0 w-125 h-125 rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex"><GraduationCap size={12} />Education</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Academic <ScrambleText text="Background" trigger={inView} className="gradient-text" delay={200} />
          </h2>
        </motion.div>

        {/* Degrees */}
        <div className="space-y-6 mb-16">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "circOut" as const }}
              className="glass glow-border rounded-2xl p-7 holographic"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${edu.color}18`, border: `1px solid ${edu.color}30` }}>
                    <GraduationCap size={22} style={{ color: edu.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-slate-100 leading-tight">{edu.degree}</h3>
                    <p className="font-medium mt-1" style={{ color: edu.color }}>{edu.institution}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{edu.field} · {edu.location}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block text-sm font-mono px-3 py-1 rounded-full"
                    style={{ color: edu.color, background: `${edu.color}15`, border: `1px solid ${edu.color}25` }}>
                    {edu.duration}
                  </span>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-y-1.5 gap-x-6">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                    <span style={{ color: edu.color }}>✓</span>{h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display font-semibold text-xl text-slate-200 mb-6 flex items-center gap-2">
            <Award size={20} className="text-indigo-400" />
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                className="glass rounded-xl p-4 border border-slate-700/30 holographic"
                whileHover={{ y: -4 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30` }}>
                  <Award size={16} style={{ color: cert.color }} />
                </div>
                <p className="text-slate-100 text-sm font-medium leading-snug mb-2">{cert.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">{cert.issuer}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
