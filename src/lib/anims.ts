export const variants = {
  enter: {
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const itemVariants = {
  enter: {
    y: [2000, 0],
    transition: { type: "spring", stiffness: 600, damping: 40},
  },
  exit: {
    y: [0, 2000],
    transition: { type: "spring", stiffness: 600, damping: 40 }
  }
}