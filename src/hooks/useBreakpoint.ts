import { useEffect, useState } from "react";

export const useBreakpoint = (breakpoint: number = 768): boolean => {
  const [isMatch, setIsMatch] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMatch(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMatch;
};
