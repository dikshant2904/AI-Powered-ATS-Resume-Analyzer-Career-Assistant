import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import ProductPreview from "@/components/landing/ProductPreview";
import FeaturesSection from "@/components/landing/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-onyx-900 selection:bg-indigo-500/30 selection:text-white">
      <LandingNavbar />
      
      <main>
        <HeroSection />
        <ProductPreview />
        <FeaturesSection />
      </main>

      <footer className="py-12 border-t border-white/5 bg-onyx-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-sm font-medium text-white tracking-tight">Nexus AI</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 Nexus AI Inc. All rights reserved.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 opacity-50">
            <p className="items-center text-sm">Made By Dikshant Namavat</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
