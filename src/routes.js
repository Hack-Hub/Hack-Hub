import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Dashboard from './Components/Dashboard/Dashboard'
import NewPost from './Components/NewPost/NewPost'
import Authenticate from './Components/Authenticate/Authenticate'
import SignIn from './Components/SignIn/SignIn'
import NewSubHub from './Components/NewSubHub/NewSubHub'
import SubHub from './Components/SubHub/SubHub'
import PostView from './Components/PostView/PostView'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/newpost" component={NewPost} />
      <Route path="/newsubhub" component={NewSubHub} />
      <Route path="/subhub" component={SubHub} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/postview" component={PostView} />
      <Redirect to="/" />
    </Switch>
  )
}
