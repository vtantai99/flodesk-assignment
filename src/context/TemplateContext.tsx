/* eslint-disable react-refresh/only-export-components */
// context/TemplateContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { ElementNode } from "@/types/dom";

interface TemplateContextType {
  selectedTemplate: ElementNode | null;
  setSelectedTemplate: (template: ElementNode | null) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ElementNode | null>(null);

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>{children}</TemplateContext.Provider>
  );
};

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
