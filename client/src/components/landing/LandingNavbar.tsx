"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function LandingNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-onyx-900/80 backdrop-blur-md border-b border-white/5 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 border-[1.5px] border-indigo-500/30 rounded-md rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
            <div className="absolute inset-0 border-[1.5px] border-indigo-400/20 rounded-md -rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-glow"></div>
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">Nexus<span className="text-slate-400 font-normal">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#preview" className="hover:text-white transition-colors">Platform</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="text-sm font-medium px-4 py-2 bg-white text-onyx-900 rounded-lg hover:bg-slate-200 transition-all shadow-glow hover:shadow-glow-strong"
          >
            Start Free
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
