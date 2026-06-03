"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { api } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function ResumeWorkspace() {
  const { activeResume, setActiveResume } = useWorkspace();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      await processResume(file);
    } else {
      toast.error("Please upload a PDF file.");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      await processResume(file);
    } else if (file) {
      toast.error("Please upload a PDF file.");
    }
  };

  const processResume = async (file: File) => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setActiveResume({
          rawText: data.data.rawText,
          ...data.data.intelligence,
        });
        toast.success("Resume Intelligence Graph generated!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to process resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Resume Intelligence</h1>
        <p className="text-slate-400 text-sm">Upload your resume to power the Nexus OS knowledge graph.</p>
      </div>

      <AnimatePresence mode="wait">
        {!activeResume && !isAnalyzing && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="h-[400px]"
          >
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full h-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
                isDragging ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-onyx-800/40 hover:bg-onyx-800/60 hover:border-white/20"
              }`}
            >
              <div className="w-20 h-20 bg-onyx-900 rounded-full flex items-center justify-center mb-6 shadow-premium">
                <UploadCloud className={`w-8 h-8 ${isDragging ? "text-indigo-400" : "text-slate-400"}`} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Drop your PDF resume here</h2>
              <p className="text-slate-400 text-sm mb-8">Nexus AI will instantly read, structure, and analyze your experience.</p>
              
              <label className="px-6 py-3 bg-white text-onyx-900 rounded-xl font-semibold cursor-pointer hover:bg-slate-200 transition-colors shadow-glow">
                Select File
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
              </label>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-[400px] flex flex-col items-center justify-center bg-onyx-800/40 border border-white/5 rounded-3xl"
          >
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-indigo-400/20 border-b-indigo-400 rounded-full"
              />
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Extracting Knowledge Graph</h2>
            <p className="text-slate-400 text-sm animate-pulse">Running semantic analysis on experience & skills...</p>
          </motion.div>
        )}

        {activeResume && !isAnalyzing && (
          <motion.div 
            key="intelligence"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Parsed Identity & Graph */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
                <div className="w-16 h-16 bg-onyx-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                  <span className="text-2xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{activeResume.name || "Candidate Name"}</h2>
                <p className="text-indigo-400 font-medium text-sm mt-1">{activeResume.role || "Role not detected"}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                    {activeResume.experienceLevel || "Mid"} Level
                  </span>
                </div>
              </div>

              <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Core Skills Graph</h3>
                <div className="flex flex-wrap gap-2">
                  {activeResume.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-onyx-900 border border-white/5 rounded-lg text-xs font-medium text-slate-300">
                      {skill}
                    </span>
                  ))}
                  {!activeResume.skills && <p className="text-xs text-slate-500">No skills detected.</p>}
                </div>
              </div>
            </div>

            {/* Right Column: Health Engine */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-premium flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Resume Health Score</h3>
                  <p className="text-sm text-slate-300 max-w-sm">Evaluated based on impact phrasing, quantifiable metrics, and technical density.</p>
                </div>
                <div className="relative flex items-center justify-center w-24 h-24">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle 
                      strokeDasharray={`${(activeResume.healthScore || 0) * 2.8} 300`}
                      cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" 
                      className={activeResume.healthScore! >= 80 ? "text-emerald-500" : "text-amber-500"}
                    />
                  </svg>
                  <span className="text-2xl font-bold text-white">{activeResume.healthScore || 0}%</span>
                </div>
              </div>

              <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-6">Actionable Insights</h3>
                <div className="space-y-4">
                  {activeResume.weakBullets?.map((bullet, idx) => (
                    <div key={idx} className="bg-onyx-900 border border-white/5 rounded-xl p-5 shadow-inner">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-semibold">Weak Phrasing Detected</p>
                          <p className="text-sm text-slate-300 line-through opacity-70 mb-3">"{bullet.original}"</p>
                          
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 relative">
                            <p className="text-xs text-emerald-500 uppercase tracking-widest mb-1 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> AI Suggestion
                            </p>
                            <p className="text-sm text-white font-medium">"{bullet.suggestion}"</p>
                          </div>
                          
                          <p className="text-xs text-indigo-300 mt-3 flex items-center gap-1">
                            <ArrowRight className="w-3 h-3" /> {bullet.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!activeResume.weakBullets || activeResume.weakBullets.length === 0) && (
                    <p className="text-sm text-slate-400">No major weaknesses detected! Your bullets are highly quantified.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
