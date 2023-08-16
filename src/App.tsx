import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/Home/Home'
import FirstName from './pages/FirstName/FirstName'
import './App.scoped.css'




function App() {

  return (
    <Router>
      <Switch>
        <Route path='/firstname'>
          <FirstName />
        </Route>
        {/* <Route path='/'>
          <LastName />
          </Route>
          <Route path='/'>
          <Mix />
        </Route> */}
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
