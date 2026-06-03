"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="w-full flex items-center justify-end gap-3 mb-6">
      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors border border-white/10 bg-white/5 hover:bg-white/10"
      >
        Logout
      </button>
    </div>
  );
}

