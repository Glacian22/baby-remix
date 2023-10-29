import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";
import { locationHistAtom } from "./lib/atom"
import { useAtom } from "jotai";
import {AnimatePresence} from 'framer-motion'
import Home from './pages/Home/Home'
import FirstName from './pages/FirstName/FirstName'
import LastName from './pages/LastName/LastName'
import Mix from './pages/Mix/Mix'


const Routes = () => {
    const location = useLocation();
    const [locationAtom, setLocationAtom] = useAtom(locationHistAtom)

  // keep track of last location so animation knows whether to enter from right or left
  // delay updating location so new page sees old location, slightly dumb hack
  // might fix with something better later, we'll see
    useEffect(() => {
      const timer = setTimeout(() => {
        setLocationAtom(location.pathname)
      }, 500)
      return () => clearTimeout(timer) 
      }, [location])
  
  return (
    <AnimatePresence>
      < Switch location={location} key={location.pathname}>
        <Route path='/firstname'>
          <FirstName />
        </Route>
        <Route path='/lastname'>
          <LastName />
        </Route>
        <Route path='/mix'>
          <Mix />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='' >
          <Redirect to='/' />
        </Route>
      </Switch >
    </AnimatePresence>
  )
}

export default Routes