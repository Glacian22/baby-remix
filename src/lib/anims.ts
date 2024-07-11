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

export const listVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {duration: .25}
  },
  exit: {
    opacity: 0,
    transition: {duration: .25}
  }
}

export const selectVariants = {
  initial: {
    transition: {
      staggerChildren: 0.1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const selectItemVariants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: .5,
    transition: { duration: .5},
  },
}




