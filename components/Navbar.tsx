"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, User, Cpu, Briefcase, FolderOpen, Mail, Flame } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About",      href: "#about",      icon: User       },
  { label: "Skills",     href: "#skills",     icon: Cpu        },
  { label: "Experience", href: "#experience", icon: Briefcase  },
  { label: "Projects",   href: "#projects",   icon: FolderOpen },
  { label: "Vibes",      href: "#vibes",      icon: Flame      },
  { label: "Contact",    href: "#contact",    icon: Mail       },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = mounted && theme === "light";

  const dockStyle = isLight
    ? { background: "rgba(255,255,255,0.92)", border: "1px solid rgba(99,102,241,0.25)", backdropFilter: "blur(24px)", boxShadow: "0 8px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)" }
    : { background: "rgba(8, 12, 35, 0.82)", border: "1px solid rgba(99,102,241,0.2)", backdropFilter: "blur(24px)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" };

  const tooltipStyle = isLight
    ? { background: "rgba(255,255,255,0.98)", border: "1px solid rgba(99,102,241,0.3)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", color: "#1e293b" }
    : { background: "rgba(15,23,42,0.95)", border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", color: "#f1f5f9" };

  const tooltipArrowColor = isLight ? "rgba(255,255,255,0.98)" : "rgba(15,23,42,0.95)";
  const iconInactiveColor = isLight ? "rgb(71,85,105)" : "rgb(100,116,139)";

  return (
    <>
      {/* ── Hire Me — top right (always visible) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-4 right-3 sm:top-5 sm:right-6 z-50"
      >
        <motion.button
          onClick={() => scrollTo("#contact")}
          className="btn-primary text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-5"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Hire Me
        </motion.button>
      </motion.div>

      {/* ── Floating bottom dock ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "circOut" as const }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2"
      >
        <div
          className="flex items-center gap-0.5 sm:gap-4 px-2 sm:px-10 py-2 sm:py-3 rounded-full"
          style={dockStyle}
        >
          {/* Brand — hidden on mobile */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-bold text-sm sm:text-base gradient-text-cyan select-none px-1 sm:px-2 hidden sm:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            iamowais
          </motion.button>

          {/* Divider — hidden on mobile */}
          <div className="w-px h-5 mx-0.5 sm:mx-1 bg-slate-700/50 rounded-full hidden sm:block" />

          {/* Nav icons */}
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <div
                key={href}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <AnimatePresence>
                  {hoveredLabel === label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap pointer-events-none"
                      style={tooltipStyle}
                    >
                      {label}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                        style={{ borderTopColor: tooltipArrowColor }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={() => scrollTo(href)}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ background: isActive ? "rgba(99,102,241,0.15)" : "transparent" }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    size={15}
                    style={{
                      color: isActive ? "#818cf8" : iconInactiveColor,
                      filter: isActive ? "drop-shadow(0 0 6px rgba(129,140,248,0.7))" : "none",
                      transition: "all 0.2s",
                    }}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="dock-indicator"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-400"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 mx-0.5 sm:mx-1 bg-slate-700/50 rounded-full" />

          {/* Theme toggle */}
          {mounted && (
            <div
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredLabel("theme")}
              onMouseLeave={() => setHoveredLabel(null)}
            >
              <AnimatePresence>
                {hoveredLabel === "theme" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap pointer-events-none"
                    style={tooltipStyle}
                  >
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                      style={{ borderTopColor: tooltipArrowColor }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ color: iconInactiveColor }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          )}

        </div>
      </motion.div>
    </>
  );
}
