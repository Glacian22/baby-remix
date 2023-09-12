import Button from "../../components/Button"
import "./home.scoped.css"

const Home = () => {

  return (
    <div className='intro'>
      <div>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D</div>
      <Button to='FirstName'>GO!</Button >
    </div>
  )

}

export default Home