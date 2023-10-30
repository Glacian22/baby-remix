export const variants = {
  enter: {
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
}

export const itemVariants = {
  initial: {
    y: 500,
    opacity: 0
  },
  enter: {
    y: [500, 0],
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 35},
  },
  exit: {
    y: [0, 500],
    opacity: 0,
    transition: { type: "spring", stiffness: 500, damping: 35 }
  }
}