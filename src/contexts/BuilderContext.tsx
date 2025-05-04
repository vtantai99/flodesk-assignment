import { BUILDER_PAGE_CONTENT } from "@/constants/localStorage";
import { ElementNode } from "@/types/dom";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { createContext, useEffect, useState } from "react";

type BuilderContextType = {
  rootElement: ElementNode | null;
  setRootElement: (el: ElementNode) => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const BuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [rootElement, setRootElementState] = useState<ElementNode | null>(getLocalStorage(BUILDER_PAGE_CONTENT));

  const setRootElement = (el: ElementNode) => {
    setRootElementState(el);
    // setLocalStorage(BUILDER_PAGE_CONTENT, el);
  };

  useEffect(() => {
    setLocalStorage(BUILDER_PAGE_CONTENT, rootElement);
  }, [rootElement]);

  return <BuilderContext.Provider value={{ rootElement, setRootElement }}>{children}</BuilderContext.Provider>;
};

export { BuilderContext, BuilderProvider };
