"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const links = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Vibes",      href: "#vibes"      },
  { label: "Contact",    href: "#contact"    },
];

const socials = [
  { icon: FiGithub,   href: "https://github.com/iamowais7",               label: "GitHub"   },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/iamosk",          label: "LinkedIn" },
  { icon: FiTwitter,  href: "https://x.com/iamosk_",                      label: "Twitter"  },
  { icon: Mail,       href: "mailto:khan.owais0555@gmail.com",             label: "Email"    },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/40 py-14 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <motion.span
            className="font-display font-bold text-xl gradient-text-cyan"
            whileHover={{ scale: 1.05 }}
          >
            {"<Owais.Khan />"}
          </motion.span>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-slate-500 hover:text-slate-200 text-sm transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 border border-slate-800/50 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 pb-6 text-[11px] font-mono text-slate-700">
          <span>psst — press <kbd className="px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-600">⌘K</kbd> for command palette</span>
          <span>press <kbd className="px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-600">`</kbd> for hacker terminal</span>
        </div>

        {/* Bottom bar */}
        <div className="relative flex items-center justify-center pt-6 border-t border-slate-800/40">
          <div className="text-slate-600 text-sm font-mono text-center">
            <p>Designed and Developed by Owais Khan</p>
            <p>All Rights Reserved · Elixir</p>
          </div>
          <motion.button
            onClick={scrollTop}
            className="absolute right-0 w-9 h-9 rounded-full glass flex items-center justify-center text-slate-500 hover:text-indigo-300 border border-slate-700/30 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
