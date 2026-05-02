"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const projects = [
  {
    title:       "AI Trip Planner",
    description: "Plan your dream trip in seconds. Input destination, dates and preferences — get a fully personalized day-by-day itinerary powered by AI. No more tab-switching through travel blogs.",
    tags:        ["React", "Vite", "Tailwind CSS", "AI Integration", "JavaScript"],
    github:      "https://github.com/iamowais7/AI-Integrated-Trip-Planner",
    demo:        "https://ai-integrated-trip-planner.vercel.app/",
    stars:       0,
    forks:       0,
    featured:    true,
    gradient:    "from-cyan-500/20 via-blue-500/10 to-indigo-500/10",
    accentColor: "#22d3ee",
  },
  {
    title:       "Owaisfolio",
    description: "The very site you're on. Built with Next.js 16, Tailwind v4, and Framer Motion. Features particle constellation canvas, custom spring cursor, aurora backgrounds, and cinematic scroll animations.",
    tags:        ["Next.js 16", "Tailwind v4", "Framer Motion", "TypeScript", "React 19"],
    github:      "https://github.com/iamowais7",
    demo:        "#",
    stars:       0,
    forks:       0,
    featured:    true,
    gradient:    "from-indigo-500/20 via-violet-500/10 to-purple-500/10",
    accentColor: "#818cf8",
  },
  {
    title:       "FitFeast AI",
    description: "AI-powered diet planner mobile app built with React Native + Expo. Get personalized meal plans, macro tracking, and smart dietary recommendations based on your fitness goals.",
    tags:        ["React Native", "Expo", "Convex", "AI", "JavaScript"],
    github:      "https://github.com/iamowais7/FitFeast-AI",
    demo:        null,
    stars:       1,
    forks:       0,
    featured:    true,
    gradient:    "from-emerald-500/20 via-teal-500/10 to-green-500/10",
    accentColor: "#34d399",
  },
  {
    title:       "Cookmate AI",
    description: "AI-powered recipe generator that suggests personalized recipes based on ingredients you already have. Reduces food waste and makes cooking effortless.",
    tags:        ["TypeScript", "AI", "React"],
    github:      "https://github.com/iamowais7/Cookmate-AI",
    demo:        null,
    stars:       0,
    forks:       0,
    featured:    false,
    gradient:    "from-orange-500/20 via-amber-500/10 to-yellow-500/10",
    accentColor: "#f97316",
  },
  {
    title:       "VEHIQL",
    description: "AI-powered car marketplace where intelligent recommendations help buyers find the perfect vehicle match based on preferences, budget, and usage patterns.",
    tags:        ["JavaScript", "AI", "React", "Node.js"],
    github:      "https://github.com/iamowais7/VEHIQL",
    demo:        null,
    stars:       0,
    forks:       0,
    featured:    false,
    gradient:    "from-red-500/20 via-rose-500/10 to-pink-500/10",
    accentColor: "#f43f5e",
  },
  {
    title:       "AI Document Q&A",
    description: "Upload any document or media file and ask questions about it. Powered by AI for intelligent extraction and contextual answers across text, images, and more.",
    tags:        ["Python", "AI", "FastAPI", "LLM"],
    github:      "https://github.com/iamowais7/AI-Powered-Document-Multimedia-Q-A-Web-Application",
    demo:        null,
    stars:       0,
    forks:       0,
    featured:    false,
    gradient:    "from-violet-500/20 via-purple-500/10 to-fuchsia-500/10",
    accentColor: "#a78bfa",
  },
];

function ProjectCard({ project, index, inView }: { project: (typeof projects)[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(ySpring, [-60, 60], [8, -8]);
  const rotateY = useTransform(xSpring, [-60, 60], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "circOut" as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group"
    >
      <div className={`glass glow-border rounded-2xl overflow-hidden holographic h-full flex flex-col bg-linear-to-br ${project.gradient} relative`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.accentColor}0c 0%, transparent 60%)` }}
        />

        <div className="relative p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}30` }}>
              <span className="font-display font-bold text-lg" style={{ color: project.accentColor }}>
                {project.title[0]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {project.stars > 0 && (
                <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />{project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                  <GitFork size={11} />{project.forks}
                </span>
              )}
            </div>
          </div>
          <h3 className="font-display font-semibold text-lg text-slate-100 mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
        </div>

        <div className="px-6 py-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/30">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto px-6 pb-6 flex items-center gap-3">
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors font-mono"
            whileHover={{ x: 2 }}>
            <FiGithub size={15} />Code
          </motion.a>
          {project.demo && project.demo !== "#" && (
            <>
              <div className="w-px h-4 bg-slate-700/60" />
              <motion.a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"
                className="flex items-center gap-2 text-sm font-mono transition-colors"
                style={{ color: project.accentColor }}
                whileHover={{ x: 2 }}>
                <ExternalLink size={15} />Live Demo
              </motion.a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const visible = showAll ? projects : featured;

  return (
    <section id="projects" ref={ref} className="relative py-32 bg-slate-900/40 overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex"><Star size={12} />Owaisfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Real apps shipped with care. AI-first, production-grade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {visible.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        <div className="text-center">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary inline-flex"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showAll ? "Show Less" : `View All Projects (+${rest.length} more)`}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
