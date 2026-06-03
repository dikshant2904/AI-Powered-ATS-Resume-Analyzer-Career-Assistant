"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import TopBar from "@/components/TopBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-onyx-900">
        <div className="w-12 h-12 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <div className="animate-pulse text-slate-400 text-sm tracking-widest font-medium uppercase">Initializing Nexus OS...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-onyx-900 text-text-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
        <div className="relative z-10 h-full">
          <div className="w-full">
            <TopBar />
          </div>
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
