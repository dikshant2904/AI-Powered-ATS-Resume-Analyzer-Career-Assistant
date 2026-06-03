"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Send, Crosshair, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Dynamic greeting logic
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="text-sm font-bold text-indigo-400">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wide">{greeting}, {user?.name?.split(" ")[0]}</p>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Workspace Overview</h1>
        </div>
        
        {/* Quick Intelligence Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 flex items-center gap-3 shadow-inner"
        >
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow shadow-glow" />
          <p className="text-xs font-medium text-indigo-300">
            {user?.credits && user.credits > 0 
              ? `System ready. You have ${user.credits} credits to fuel your job search.`
              : "You are out of credits. Upgrade your plan to generate more."}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Action Area (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Start Tools */}
          <section>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Launch Tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "ATS Matcher", icon: Crosshair, href: "/dashboard/ats", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { name: "Cover Letter", icon: FileText, href: "/dashboard/cover-letter", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                { name: "Proposal", icon: Send, href: "/dashboard/proposal", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" }
              ].map((tool, idx) => (
                <Link key={tool.name} href={tool.href}>
                  <motion.div 
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
                    transition={{ duration: 0.2 }}
                    className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-premium cursor-pointer h-full flex flex-col justify-between"
                  >
                    <div className={`w-10 h-10 rounded-lg ${tool.bg} ${tool.border} border flex items-center justify-center mb-4`}>
                      <tool.icon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{tool.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity Shell */}
          <section>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h2>
            <div className="bg-onyx-800/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-inner min-h-[200px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                <span className="text-xl">📂</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1">No generated documents yet.</h3>
              <p className="text-xs text-slate-400 mb-4 max-w-sm">When you generate cover letters or proposals, they will automatically be saved here for easy access.</p>
              <Link href="/dashboard/cover-letter" className="text-xs font-semibold px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition-colors">
                Create Your First Draft
              </Link>
            </div>
          </section>

        </div>

        {/* Sidebar Sidebar Area (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Smart Recommendation */}
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
            <h2 className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              Nexus Insight
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium mb-4">
              Did you know? Tailoring your cover letter to the company's core values increases response rates by 40%.
            </p>
            <Link href="/dashboard/cover-letter" className="text-xs font-medium text-white hover:text-indigo-300 transition-colors flex items-center gap-1">
              Try it now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Account Snapshot */}
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Account Snapshot</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-sm text-slate-400">Current Plan</span>
                <span className="text-sm font-semibold text-emerald-400 capitalize">{user?.subscriptionPlan || "Free"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Credits Remaining</span>
                <span className="text-sm font-bold text-white">{user?.credits || 0}</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white rounded-lg transition-colors border border-white/5">
              Manage Billing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
