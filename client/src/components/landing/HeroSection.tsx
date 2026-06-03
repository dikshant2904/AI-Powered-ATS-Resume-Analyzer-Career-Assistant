"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
      {/* Cinematic Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse-slow" />
          <span className="text-[11px] font-semibold tracking-widest text-indigo-300 uppercase">Nexus OS 2.0 Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          Your AI Career <br />
          <span className="text-slate-400">Operating System.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Professional intelligence for modern work. Bypass the ATS, draft converting proposals, and manage your career growth from a single, unified workspace.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/register" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-onyx-900 font-semibold rounded-xl hover:bg-slate-200 transition-all shadow-glow hover:shadow-glow-strong flex items-center justify-center gap-2"
          >
            Start Free
          </Link>
          <Link 
            href="#preview" 
            className="w-full sm:w-auto px-8 py-4 bg-onyx-800 border border-white/10 text-white font-medium rounded-xl hover:bg-onyx-700 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            Explore Workspace
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
