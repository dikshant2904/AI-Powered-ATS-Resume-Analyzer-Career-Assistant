"use client";

import { useState, useEffect } from "react";
import { api } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function CoverLetter() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("Professional");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { activeResume } = useWorkspace();

  // Auto-fill from Workspace Memory
  useEffect(() => {
    if (activeResume?.rawText && !resumeText) {
      setResumeText(activeResume.rawText);
    }
  }, [activeResume, resumeText]);

  const handleGenerate = async () => {
    if (!resumeText || !companyName || !role) {
      toast.error("Please provide resume text, company name, and role.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    try {
      const { data } = await api.post("/ai/cover-letter", { 
        resumeText, 
        jobDescription,
        companyName,
        role,
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
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Cover Letter Generator</h1>
        <p className="text-slate-400 text-sm">Generate hyper-personalized cover letters tailored to exact job requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-sm">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Company Name *</label>
              <input
                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                placeholder="Google"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-sm">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Target Role *</label>
              <input
                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                placeholder="Frontend Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-sm">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Your Resume Text *</label>
            <textarea
              className="w-full h-32 bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-sm">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Job Description (Optional)</label>
            <textarea
              className="w-full h-32 bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="Paste the job description for better alignment..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-sm">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tone</label>
            <select
              className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Confident">Confident</option>
              <option value="Conversational">Conversational</option>
              <option value="Aggressive">Aggressive (Sales-like)</option>
            </select>
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
            ) : "Generate Document"}
          </motion.button>
        </div>

        <div className="bg-onyx-800/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 min-h-[600px] flex flex-col relative shadow-inner overflow-hidden">
          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                <span className="text-xl">📄</span>
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
