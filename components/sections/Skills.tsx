"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress,
  SiPython, SiDjango, SiFastapi, SiPostgresql,
  SiGit, SiPostman, SiApacheairflow,
  SiOpenai, SiAnthropic, SiGooglegemini,
} from "react-icons/si";
import { Cpu, Code2 } from "lucide-react";
import TechGlobe from "../TechGlobe";
import ScrambleText from "../ScrambleText";

type Skill = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  level: number;
  color: string;
  cat: string;
};

const skills: Skill[] = [
  { name: "Node.js",      icon: SiNodedotjs,     level: 90, color: "#68a063", cat: "Backend"   },
  { name: "Express.js",   icon: SiExpress,       level: 88, color: "#ffffff", cat: "Backend"   },
  { name: "FastAPI",      icon: SiFastapi,       level: 78, color: "#009688", cat: "Backend"   },
  { name: "Python",       icon: SiPython,        level: 82, color: "#3776ab", cat: "Language"  },
  { name: "Django",       icon: SiDjango,        level: 72, color: "#44b78b", cat: "Backend"   },
  { name: "PostgreSQL",   icon: SiPostgresql,    level: 85, color: "#336791", cat: "Database"  },
  { name: "REST APIs",    icon: SiPostman,       level: 90, color: "#ff6c37", cat: "Backend"   },
  { name: "React.js",     icon: SiReact,         level: 76, color: "#61dafb", cat: "Frontend"  },
  { name: "Next.js",      icon: SiNextdotjs,     level: 72, color: "#d4d4d4", cat: "Frontend"  },
  { name: "Airflow",      icon: SiApacheairflow, level: 72, color: "#017cee", cat: "DevOps"    },
  { name: "Git",          icon: SiGit,           level: 88, color: "#f05032", cat: "Tools"     },
  { name: "ChatGPT",      icon: SiOpenai,        level: 88, color: "#10a37f", cat: "AI"        },
  { name: "Claude",       icon: SiAnthropic,     level: 85, color: "#d4a574", cat: "AI"        },
  { name: "Gemini",       icon: SiGooglegemini,  level: 78, color: "#4285f4", cat: "AI"        },
  { name: "Prompt Eng.",  icon: Cpu,             level: 85, color: "#c084fc", cat: "AI"        },
  { name: "Vibe Coding",  icon: Code2,           level: 99, color: "#f472b6", cat: "Vibes"     },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const card = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "circOut" as const } },
};

function SkillCard({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <motion.div
      variants={card}
      className="group glass glow-border rounded-xl p-4 holographic flex flex-col gap-3 relative overflow-hidden cursor-default"
      whileHover={{ y: -5, boxShadow: `0 0 25px ${skill.color}22, 0 0 50px ${skill.color}0d`, transition: { duration: 0.2 } }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}0e 0%, transparent 60%)` }}
      />

      <div className="flex items-start justify-between">
        <skill.icon style={{ color: skill.color, fontSize: 26 }} className="drop-shadow-[0_0_5px_currentColor] shrink-0" />
        <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full" style={{ color: skill.color, background: `${skill.color}18`, border: `1px solid ${skill.color}25` }}>
          {skill.cat}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display font-semibold text-slate-100 text-xs">{skill.name}</span>
          <span className="text-[11px] font-mono" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
        <div className="skill-progress-track">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 bg-slate-900/40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">Technical Arsenal</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Skills &amp; <ScrambleText text="Technologies" trigger={inView} className="gradient-text" delay={200} />
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Battle-tested in production — and yes, vibe coding is a real skill.
          </p>
        </motion.div>

        <TechGlobe />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} inView={inView} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center text-slate-500 text-sm font-mono mt-10"
        >
          + always shipping something new with AI 🚀
        </motion.p>
      </div>
    </section>
  );
}
