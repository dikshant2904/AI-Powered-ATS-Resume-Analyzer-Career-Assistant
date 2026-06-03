"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState("ats");
  const [typingText, setTypingText] = useState("");
  const fullText = "Based on the job description, your resume has a 86% match. To increase your score to 95%+, consider adding the following keywords: 'React Query', 'Server Components', and 'Micro-frontends'.";

  useEffect(() => {
    if (activeTab === "ats") {
      let i = 0;
      setTypingText("");
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypingText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  return (
    <section id="preview" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Peek inside the workspace.</h2>
          <p className="text-slate-400">Experience a fluid, intelligent environment designed for deep work.</p>
        </div>

        {/* Dashboard Mock Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-onyx-900 shadow-premium overflow-hidden flex flex-col md:flex-row h-[600px]"
        >
          {/* Mock Sidebar */}
          <div className="w-full md:w-64 bg-onyx-800/50 border-r border-white/5 p-6 flex flex-col gap-6 hidden md:flex">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-16 bg-white/10 rounded mb-4" />
              {["ats", "cover", "proposal"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "ats" ? "ATS Matcher" : tab === "cover" ? "Cover Letters" : "Proposals"}
                </button>
              ))}
            </div>
          </div>

          {/* Mock Main Content Area */}
          <div className="flex-1 p-8 bg-onyx-900 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-8">
              <div className="h-6 w-48 bg-white/5 rounded-md animate-pulse" />
              <div className="h-8 w-24 bg-indigo-500/10 border border-indigo-500/20 rounded-md" />
            </div>

            {/* Interactive Tab Content */}
            <div className="flex-1 flex gap-6">
              <div className="w-1/2 space-y-4">
                <div className="h-32 bg-black/20 border border-white/5 rounded-xl p-4 shadow-inner">
                  <div className="h-2 w-24 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded" />
                    <div className="h-1.5 w-5/6 bg-white/5 rounded" />
                    <div className="h-1.5 w-4/6 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-32 bg-black/20 border border-white/5 rounded-xl p-4 shadow-inner">
                  <div className="h-2 w-24 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded" />
                    <div className="h-1.5 w-3/4 bg-white/5 rounded" />
                  </div>
                </div>
              </div>

              <div className="w-1/2 bg-onyx-800/30 border border-white/5 rounded-xl p-6 relative flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-indigo-500/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow" />
                  </div>
                  <span className="text-xs font-medium text-indigo-400 uppercase tracking-widest">Nexus Intelligence</span>
                </div>
                
                {activeTab === "ats" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                          <motion.circle 
                            initial={{ strokeDasharray: "0 300" }}
                            animate={{ strokeDasharray: "240 300" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" 
                          />
                        </svg>
                        <span className="text-2xl font-semibold text-white">86%</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-mono">
                      {typingText}
                      <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-1.5 h-4 bg-indigo-400 ml-1 translate-y-1"
                      />
                    </p>
                  </div>
                )}
                
                {activeTab !== "ats" && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin mb-4" />
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Drafting Document</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
