"use client";

import { useState, useEffect } from "react";
import { api } from "@/context/AuthContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Target, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export default function ATSMatcher() {
  const { activeResume } = useWorkspace();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Auto-fill from Workspace Memory
  useEffect(() => {
    if (activeResume?.rawText && !resumeText) {
      setResumeText(activeResume.rawText);
      toast.info("Resume loaded from Workspace Memory", { autoClose: 2000 });
    }
  }, [activeResume, resumeText]);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      toast.error("Please provide both resume and job description");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    try {
      const { data } = await api.post("/ai/ats", { resumeText, jobDescription });
      if (data.success) {
        setResult(data.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getRadarData = () => {
    if (!result?.categoryScores) return [];
    return [
      { subject: 'Skills', A: result.categoryScores.skillsMatch || 0, fullMark: 100 },
      { subject: 'Experience', A: result.categoryScores.experienceMatch || 0, fullMark: 100 },
      { subject: 'Leadership', A: result.categoryScores.leadershipMatch || 0, fullMark: 100 },
      { subject: 'Formatting', A: activeResume?.healthScore || 85, fullMark: 100 },
    ];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">ATS Deep Analysis</h1>
        <p className="text-slate-400 text-sm">A granular recruiter-level simulation against the target role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Input Column (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Resume Context</label>
              {activeResume && <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">Memory Active</span>}
            </div>
            <textarea
              className="w-full h-32 bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-premium">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Target Job Description</label>
            <textarea
              className="w-full h-48 bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner custom-scrollbar"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full py-4 bg-white text-onyx-900 rounded-xl font-semibold hover:bg-slate-200 transition-all shadow-glow hover:shadow-glow-strong disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Running Deep Scan..." : "Run ATS Simulation"}
          </button>
        </div>

        {/* Intelligence Column (3/5) */}
        <div className="lg:col-span-3">
          <div className="bg-onyx-800/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 min-h-[600px] flex flex-col relative shadow-inner">
            
            {!result && !isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 shadow-premium">
                  <Target className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Awaiting target context</h3>
                <p className="text-sm text-slate-400 max-w-sm">Provide a job description to simulate how an algorithmic recruiter will score your resume.</p>
              </div>
            )}

            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center w-20 h-20 mb-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-indigo-400/10 border-b-indigo-400 rounded-full" />
                </div>
                <p className="text-indigo-400 text-sm font-medium animate-pulse mb-2">Simulating Hiring Logic...</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Evaluating deep matrix fit</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Header Score Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-onyx-900 border border-white/5 rounded-xl p-6 shadow-inner flex items-center gap-6">
                    <div className="relative flex items-center justify-center w-20 h-20">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <circle strokeDasharray={`${(result.overallScore || 0) * 2.8} 300`} cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className={result.overallScore >= 80 ? "text-emerald-500" : result.overallScore >= 50 ? "text-amber-500" : "text-rose-500"} />
                      </svg>
                      <span className="text-2xl font-bold text-white">{result.overallScore || 0}%</span>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Overall Match</h3>
                      <p className="text-sm text-slate-300 font-medium">Confidence Score</p>
                    </div>
                  </div>

                  <div className="bg-onyx-900 border border-white/5 rounded-xl p-6 shadow-inner flex flex-col justify-center">
                    <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Recruiter Readiness</h3>
                    <div className="inline-flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${result.readinessIndicator === 'High Risk' ? 'bg-rose-500' : result.readinessIndicator === 'Exceptional Fit' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                      <span className="text-lg font-bold text-white">{result.readinessIndicator || "Unknown"}</span>
                    </div>
                  </div>
                </div>

                {/* Radar Chart & Missing Keywords */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-onyx-900 border border-white/5 rounded-xl p-4 shadow-inner h-[250px]">
                    <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 px-2">Category Match Matrix</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={getRadarData()}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-onyx-900 border border-white/5 rounded-xl p-5 shadow-inner overflow-y-auto custom-scrollbar h-[250px]">
                    <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Missing Keywords</h3>
                    <div className="flex flex-col gap-3">
                      {result.missingKeywords?.map((k: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5">
                          <span className="text-xs text-white font-medium">{k.keyword}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${k.severity === 'High' ? 'bg-rose-500/10 text-rose-400' : k.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'}`}>
                            {k.severity} Risk
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actionable Feedback */}
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                  <h3 className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Improve Strategies
                  </h3>
                  <ul className="space-y-3">
                    {result.actionableFeedback?.map((feedback: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-relaxed font-medium">
                        <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        {feedback}
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
