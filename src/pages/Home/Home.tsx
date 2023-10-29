import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { locationHistAtom } from "../../lib/atom"
import Button from "../../components/Button"
import "./home.scoped.css"

const Home = () => {

  const [locationHist] = useAtom(locationHistAtom)
  console.log(locationHist)
  return (
    <div className='intro'>
      <motion.div key='explainer' exit={{ x: -300, opacity: 0 }}>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D
      </motion.div>
      <motion.div key='hi' exit={{ x: -300, opacity: 0}} animate={{ y: [300, 0] }} transition={{ type: 'spring', bounce: .5, duration: .5 }}>
        <Button to='FirstName'>GO!</Button >
      </motion.div>
    </div>
  )

}

export default Home