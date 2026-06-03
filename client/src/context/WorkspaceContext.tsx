"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// The shape of the parsed Resume Intelligence
export interface ParsedResume {
  rawText: string;
  name?: string;
  role?: string;
  skills?: string[];
  technologies?: string[];
  experienceLevel?: string;
  healthScore?: number;
  weakBullets?: {
    original: string;
    suggestion: string;
    reason: string;
  }[];
}

interface WorkspaceContextType {
  activeResume: ParsedResume | null;
  setActiveResume: (resume: ParsedResume | null) => void;
  clearWorkspace: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [activeResume, setActiveResume] = useState<ParsedResume | null>(null);

  const clearWorkspace = () => {
    setActiveResume(null);
  };

  return (
    <WorkspaceContext.Provider value={{ activeResume, setActiveResume, clearWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
