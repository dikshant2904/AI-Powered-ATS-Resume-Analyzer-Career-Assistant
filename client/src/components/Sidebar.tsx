"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Send, 
  Target, 
  Settings,
  CreditCard,
  User,
  Database
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Resume Memory", href: "/dashboard/resume", icon: Database },
    { name: "ATS Matcher", href: "/dashboard/ats", icon: Target },
    { name: "Cover Letter", href: "/dashboard/cover-letter", icon: FileText },
    { name: "Proposals", href: "/dashboard/proposal", icon: Send },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-onyx-800/50 backdrop-blur-md border-r border-white/5 hidden md:flex flex-col relative z-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 border-[1.5px] border-indigo-500/30 rounded-md rotate-45"></div>
            <div className="absolute inset-0 border-[1.5px] border-indigo-400/20 rounded-md -rotate-12"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-glow"></div>
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">Nexus<span className="text-slate-400 font-normal">AI</span></span>
        </div>

        <nav className="space-y-[2px]">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4 px-3">Workspace</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                  isActive 
                    ? "bg-white/5 text-text-1 shadow-sm" 
                    : "text-slate-400 hover:text-text-1 hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-indigo-400" : "text-slate-500"}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-white/5">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-text-1 hover:bg-white/[0.02] transition-all"
        >
          <Settings className="w-[18px] h-[18px] text-slate-500" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
