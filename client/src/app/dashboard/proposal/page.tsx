"use client";

import { useState, useEffect } from "react";
import { api } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function ProposalGenerator() {
  const [clientRequirements, setClientRequirements] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Intermediate");
  const [tone, setTone] = useState("Confident");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { activeResume } = useWorkspace();

  // Auto-fill from Workspace Memory
  useEffect(() => {
    if (activeResume?.skills && !userSkills) {
      setUserSkills(activeResume.skills.join(", "));
    }
  }, [activeResume, userSkills]);

  const handleGenerate = async () => {
    if (!clientRequirements || !userSkills) {
      toast.error("Please provide client requirements and your skills.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    try {
      const { data } = await api.post("/ai/proposal", { 
        clientRequirements,
        userSkills,
        experienceLevel,
        tone
      });
      if (data.success) {
        setResult(data.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Proposal Generator</h1>
        <p className="text-slate-400 text-sm">Craft high-converting, professional pitches for Upwork & freelance clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-sm">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Client's Project Requirements *</label>
            <textarea
              className="w-full h-32 bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="Paste the job post or client requirements here..."
              value={clientRequirements}
              onChange={(e) => setClientRequirements(e.target.value)}
            />
          </div>

          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-sm">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Your Skills / Background *</label>
            <textarea
              className="w-full h-24 bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="e.g. 5 years React, Node.js, built 3 SaaS apps..."
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-sm">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Experience Level</label>
              <select
                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-sm">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tone</label>
              <select
                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="Confident">Confident</option>
                <option value="Friendly">Friendly</option>
                <option value="Consultative">Consultative</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3.5 bg-text-1 hover:bg-white text-onyx-900 rounded-lg font-semibold transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-sm text-sm"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-onyx-900/20 border-t-onyx-900 rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : "Generate Proposal"}
          </motion.button>
        </div>

        <div className="bg-onyx-800/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 min-h-[600px] flex flex-col relative shadow-inner overflow-hidden">
          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                <span className="text-xl">🚀</span>
              </div>
              <p className="text-sm font-medium">Configure parameters to generate.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              {/* Abstract Minimal AI Loading Glow */}
              <div className="relative flex items-center justify-center w-16 h-16">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-indigo-500/30 rounded-lg"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border border-indigo-400/20 rounded-full"
                />
                <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-glow animate-pulse-slow" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-indigo-400 text-sm font-medium animate-pulse">Drafting Content...</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Connecting to Nexus AI</p>
              </div>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white tracking-wide">Generated Draft</h3>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs font-medium px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-md transition-colors border border-white/5"
                >
                  Copy Document
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <MarkdownRenderer content={result} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
