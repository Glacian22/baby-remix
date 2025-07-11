import { useState } from "react"
import { motion } from "framer-motion"
import Button from "../../components/Button"
import { useFlags, withLDConsumer } from 'launchdarkly-react-client-sdk'
import { variants, itemVariants } from "../../lib/anims"
import "./home.scoped.css"

const Home = ({flags, ldClient}) => {
  const {welcomeText='nope'} = useFlags();
  // const {welcomeText} = flags;

    return (
     <motion.div className='intro' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div key='explainer' variants={itemVariants}>
        {welcomeText}
        {console.log(`Welcome Text: ${welcomeText}`)}
        {/* {console.log(ldClient.variation('welcomeText', 'boo'))} */}
      </motion.div>
      <motion.div key='go' id='welcome-go-btn' variants={itemVariants}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </motion.div>
  )

}

export default withLDConsumer()(Home)