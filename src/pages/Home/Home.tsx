import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { locationHistAtom } from "../../lib/atom"
import Button from "../../components/Button"
import "./home.scoped.css"

const Home = () => {

  const [locationHist] = useAtom(locationHistAtom)
  console.log(locationHist)

  const variants = {
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

  const itemVariants = {
    enter: {
      y: [100, 0],
      transition: { type: 'spring', bounce: .5, duration: .5 }
    },
    exit: {
      y: [0, 100],
      transition: { type: 'spring', bounce: .5, duration: .5 }
    }
  }

  return (
    <motion.div className='intro' variants={variants} initial='enter' exit='exit'>
      <motion.div key='explainer' variants={itemVariants}>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D
      </motion.div>
      <motion.div key='hi' variants={itemVariants}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </motion.div>
  )

}

export default Home