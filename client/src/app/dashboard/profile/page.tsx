"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">My Profile</h1>
        <p className="text-slate-400 text-sm">Manage your identity and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Identity Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl text-indigo-400 font-semibold">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{user?.name}</h2>
            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
            
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
              <button className="w-full py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/5">
                Edit Profile
              </button>
              <button className="w-full py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors">
                Reset Password
              </button>
            </div>
          </div>
        </div>

        {/* Stats & Settings Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Usage Stats Card */}
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Workspace Usage</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-onyx-900 border border-white/5 rounded-xl p-4 shadow-inner">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Plan</p>
                <p className="text-lg font-semibold text-emerald-400 capitalize">{user?.subscriptionPlan || "Free Tier"}</p>
              </div>
              <div className="bg-onyx-900 border border-white/5 rounded-xl p-4 shadow-inner">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Credits</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-lg font-semibold text-white">{user?.credits || 0}</p>
                  <span className="text-xs text-slate-500">remaining</span>
                </div>
              </div>
              <div className="bg-onyx-900 border border-white/5 rounded-xl p-4 shadow-inner">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Generated</p>
                <p className="text-lg font-semibold text-white">0 <span className="text-xs text-slate-500 font-normal">documents</span></p>
              </div>
              <div className="bg-onyx-900 border border-white/5 rounded-xl p-4 shadow-inner">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Account Created</p>
                <p className="text-sm font-medium text-white mt-1">Just now</p>
              </div>
            </div>
          </div>

          {/* Preferences Placeholder */}
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">AI Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">Default Writing Tone</p>
                  <p className="text-xs text-slate-400">Set the default tone for all generated content.</p>
                </div>
                <select disabled className="bg-onyx-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-400 opacity-50 cursor-not-allowed">
                  <option>Professional</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-white">Target Career Path</p>
                  <p className="text-xs text-slate-400">Helps Nexus AI contextualize recommendations.</p>
                </div>
                <button disabled className="px-3 py-1.5 bg-white/5 text-xs font-medium text-slate-500 rounded-lg cursor-not-allowed border border-white/5">
                  Set Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
