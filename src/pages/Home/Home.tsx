import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <>
      <div>Here's a whole bunch of intro text telling you how to use the Baby Name Mixer :D :D :D</div>
      <Link to={'/FirstName'}>GO!</Link >
  </>
  )

}

export default Home