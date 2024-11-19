"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GPTContextType {
  gptResponse: string | null;
  setGptResponse: (response: string) => void;
}


const GPTContext = createContext<GPTContextType | undefined>(undefined);

export const GPTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gptResponse, setGptResponse] = useState<string | null>(null);

  return (
    <GPTContext.Provider value={{ gptResponse, setGptResponse }}>
      {children}
    </GPTContext.Provider>
  );
};

export const useGPTContext = (): GPTContextType => {
  const context = useContext(GPTContext);
  if (!context) {
    throw new Error("useGPTContext deve ser usado dentro de um GPTProvider");
  }
  return context;
};
