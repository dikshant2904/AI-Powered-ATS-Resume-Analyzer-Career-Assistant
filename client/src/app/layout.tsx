import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Nexus AI Platform",
  description: "Advanced AI Workspace for your career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-onyx-900 text-text-1 font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
        <AuthProvider>
          <WorkspaceProvider>
            {children}
            <ToastContainer 
              theme="dark" 
              toastClassName="bg-onyx-800 border border-white/5 text-sm font-medium shadow-premium rounded-xl"
            />
          </WorkspaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
