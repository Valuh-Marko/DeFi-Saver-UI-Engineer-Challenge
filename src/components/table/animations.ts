export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.425,
      ease: [0.52, 0, 0.34, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.425,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const popInOut = {
  initial: {
    scale: 0,
    x: "-25%",
  },
  enter: {
    scale: 1,
    rotate: 0,
    x: "-25%",
  },
  asc: {
    scale: 1,
    rotate: 0,
    x: "-25%",
  },
  desc: {
    scale: 1,
    rotate: 180,
    x: "-25%",
  },
  exit: {
    transformOrigin: "center",
    scale: 0,
    opacity: 0,
  },
};
