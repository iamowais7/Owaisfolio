"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, MapPin, Clock } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

const EMAIL = "khan.owais0555@gmail.com";

const socials = [
  { icon: FiGithub,    label: "GitHub",    href: "https://github.com/iamowais7",              color: "#f1f5f9" },
  { icon: FiLinkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/iamosk",         color: "#0a66c2" },
  { icon: FiTwitter,   label: "Twitter/X", href: "https://x.com/iamosk_",                      color: "#1d9bf0" },
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/iamosk_/",          color: "#e1306c" },
  { icon: Mail,        label: "Email",     href: `mailto:${EMAIL}`,                             color: "#818cf8" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("message", `Subject: ${form.subject}\n\n${form.message}`);
      data.append("_subject", `Portfolio Contact: ${form.subject}`);
      data.append("_captcha", "false");
      await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-slate-900/40 overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex"><Mail size={12} />Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Have a project, opportunity, or just want to say hi? I reply fast. 🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass glow-border rounded-2xl p-6">
              <h3 className="font-display font-semibold text-slate-100 mb-5">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MapPin size={16} className="text-cyan-400 shrink-0" />
                  <span>New Delhi, India (Remote)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Clock size={16} className="text-violet-400 shrink-0" />
                  <span>IST (UTC+5:30) · Reply within 24h</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/40">
                <p className="text-slate-400 text-sm mb-4">Find me everywhere</p>
                <div className="flex gap-2 flex-wrap">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-slate-700/30 text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ ["--h" as string]: color }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass glow-border-animated rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="text-emerald-300 font-medium text-sm">Available for hire</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Open to full-time opportunities, contract work, and interesting collaborations. Remote from Delhi.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass glow-border rounded-2xl p-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input type="text" required placeholder="Your Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-glow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-glow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                <input type="text" required placeholder="What's this about?" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-glow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea required rows={5} placeholder="Tell me more..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-glow resize-none" />
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                className="btn-primary w-full justify-center disabled:opacity-60"
                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
              >
                {status === "idle"    && <><Send size={16} />Send Message</>}
                {status === "sending" && <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending…</>}
                {status === "sent"    && <>✓ Message Delivered!</>}
                {status === "error"   && <>✗ Failed — Email me directly</>}
              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
