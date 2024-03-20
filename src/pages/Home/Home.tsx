import { motion } from "framer-motion"
import Button from "../../components/Button"
import { useFlags } from 'launchdarkly-react-client-sdk'
import { variants, itemVariants } from "../../lib/anims"
import "./home.scoped.css"

const Home = () => {
  const {welcomeText} = useFlags()


  return (
    <motion.div className='intro' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div key='explainer' variants={itemVariants}>
        {welcomeText}
      </motion.div>
      <motion.div key='go' variants={itemVariants}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </motion.div>
  )

}

export default Home