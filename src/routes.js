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
import SearchResults from './Components/SearchResults/SearchResults'
import SignOut from './Components/SignOut/SignOut'
import User from './Components/User/User'

export default function Routes(props) {
  // console.log('props', props)
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/newpost" component={NewPost} />
      <Route path="/newsubhub" component={NewSubHub} />
      <Route path="/subhub/:id" component={SubHub} />
      <Route path="/authenticate" component={Authenticate} />
      {/* DON'T CHANGE THESE ROUTES (signin & signout)... GETTING AN ERROR WHEN RENDING THEM THE OTHER WAY */}
      <Route path="/signIn" render={() => <SignIn setLoggedIn={props.setLoggedIn} />} />
      <Route path="/signOut" render={() => <SignOut />} />
      <Route path="/postview/:postId" component={PostView} />
      <Route path="/searchResults/:id" exact component={SearchResults} />
      {/* <Route exact path="/searchResults/:id" render={() =>  <SearchResults user={props.user} />} /> */}
      <Route path="/user/:userId" component={User} />
      <Redirect to="/" />
    </Switch>
  )
}
