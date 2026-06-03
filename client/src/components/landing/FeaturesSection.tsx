"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "ATS Intelligence",
    description: "Reverse-engineer algorithmic resume screeners before a human ever sees your application. Exact keyword matching and scoring.",
    icon: "🎯"
  },
  {
    title: "Cover Letter Engine",
    description: "Generate highly personalized, context-aware cover letters that align perfectly with the target role and company culture.",
    icon: "📝"
  },
  {
    title: "Freelance Proposals",
    description: "Draft high-converting pitches for Upwork and direct clients. Highlight your specific skills against client requirements.",
    icon: "🚀"
  },
  {
    title: "Resume Insights",
    description: "Actionable recommendations on how to structure your experience to pass technical screens.",
    icon: "📊"
  },
  {
    title: "Workspace Memory",
    description: "Nexus AI remembers your career history, ensuring tone and context remain consistent across all your applications.",
    icon: "🧠"
  },
  {
    title: "Intelligent Editor",
    description: "Refine, shorten, or change the tone of your generated documents inside a premium Markdown-powered workspace.",
    icon: "✨"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative z-10 bg-onyx-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Everything you need to scale your career.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Stop writing boilerplate text. Automate the application process without sacrificing quality or personalization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-onyx-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:bg-onyx-800/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
