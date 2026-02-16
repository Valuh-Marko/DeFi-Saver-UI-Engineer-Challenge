import { stagger } from "motion";

export const expandDown = {
  hide: {
    opacity: 0,
    height: 0,
    pointerEvents: "none",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as const,
      delayChildren: stagger(0.05),
    },
  },

  show: {
    opacity: 1,
    height: "auto",
    pointerEvents: "auto",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as const,
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export const optionVariant = {
  hide: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};
