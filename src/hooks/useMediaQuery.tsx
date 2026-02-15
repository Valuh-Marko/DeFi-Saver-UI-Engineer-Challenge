import { useEffect, useState } from "react";

type UseMediaQueryProps = "mobile" | "tablet";

const breakpoints = {
  mobile: 480,
  tablet: 768,
};

export const useMediaQuery = (device: UseMediaQueryProps): boolean => {
  const getMatches = () =>
    typeof window !== "undefined"
      ? window.innerWidth <= breakpoints[device]
      : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const handleResize = () => setMatches(getMatches());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return matches;
};
