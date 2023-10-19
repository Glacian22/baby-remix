import { motion } from "framer-motion"
import Button from "../../components/Button"
import "./home.scoped.css"

const Home = () => {

  return (
    <div className='intro'>
      <div>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D</div>
      <motion.div animate={{y: [300, 0]}} transition={{type: 'spring', bounce: .5, duration: .5}}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </div>
  )

}

export default Home