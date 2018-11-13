import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Dashboard from './Components/Dashboard/Dashboard'
import NewPost from './Components/NewPost/NewPost'
import Authenticate from './Components/Authenticate/Authenticate'
import SignIn from './Components/SignIn/SignIn'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/newpost" component={NewPost} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/signIn" component={SignIn} />
      <Redirect to="/" />
    </Switch>
  )
}
