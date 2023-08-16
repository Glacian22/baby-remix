import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scoped.css'




function App() {

  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='/'>
          <FirstName />
        </Route>
        <Route path='/'>
          <LastName />
        </Route>
        <Route path='/'>
          <Mix />
        </Route>
        <Route path='*'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
