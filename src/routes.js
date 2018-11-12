import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Dashboard from './Components/Dashboard/Dashboard'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  )
}
