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
import './App.scoped.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
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
    </Router>
  )
}

export default App
