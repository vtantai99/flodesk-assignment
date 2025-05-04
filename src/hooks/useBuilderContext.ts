import { BuilderContext } from "@/contexts/BuilderContext";
import { useContext } from "react";

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (!context) throw new Error("useBuilderContext must be used within BuilderProvider");
  return context;
};
