import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Landing from './components/Landing'
import './css/main.sass'

render((
  <Router>
    <Switch>
      <Route exact path="/" component={Landing}/>
    </Switch>
  </Router>
), document.getElementById('app'));
