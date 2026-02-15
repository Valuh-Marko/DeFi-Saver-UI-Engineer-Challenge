export const opacity = {
  initial: {
    display: "none",
    opacity: 0,
  },
  enter: {
    display: "flex",
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: [0.52, 0, 0.34, 1],
    },
  },
  exit: {
    display: "none",
    opacity: 0,
    height: "0",
    transition: {
      duration: 0.22,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
