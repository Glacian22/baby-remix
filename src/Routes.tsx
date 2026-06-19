import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import {AnimatePresence} from 'framer-motion'
import Home from './pages/Home/Home'
import FirstName from './pages/FirstName/FirstName'
import LastName from './pages/LastName/LastName'
import Mix from './pages/Mix/Mix'
import Favorites from './pages/Favorites/Favorites'


const Routes = () => {
    const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
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
        <Route path='/favorites'>
          <Favorites />
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