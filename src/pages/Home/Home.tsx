import { motion } from "framer-motion"
import Button from "../../components/Button"
import { variants, itemVariants } from "../../lib/anims"
import "./home.scoped.css"

const Home = () => {

  return (
    <motion.div className='intro' variants={variants} animate='enter' exit='exit'>
      <motion.div key='explainer' variants={itemVariants}>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D
      </motion.div>
      <motion.div key='go' variants={itemVariants}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </motion.div>
  )

}

export default Home