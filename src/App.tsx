import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/Home/Home'
import FirstName from './pages/FirstName/FirstName'
import LastName from './pages/LastName/LastName'
import Mix from './pages/Mix/Mix'
import Navbar from "./components/Navbar";
import { themeAtom } from "./lib/atom";
import { useAtom } from "jotai"
import './App.scoped.css'
import './App.global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme] = useAtom(themeAtom)

  return (
    <div className="app-global" data-theme={theme}>
      <div className=" app-content">
        <Router>
          <Navbar />
          <div id="content-wrap">
            <Switch>
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
            </Switch>
          </div>
        </Router>
      </div>
    </div >
  )
}

export default App
