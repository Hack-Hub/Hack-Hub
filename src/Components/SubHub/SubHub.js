import React, { Component } from 'react'
import './SubHub.scss'
import { Route, Switch, Link } from 'react-router-dom'
import Chat from '../Chat/Chat'
import PostFeed from '../PostFeed/PostFeed'

class SubHub extends Component {
  render() {
    return (
      <div className="SubHub--container">
        <section className="banner" style={{ background: '#00a7f7' }}>
          <div className="banner-container">
            <img
              src="https://cdn6.littlethings.com/app/uploads/2017/02/cat-selfie1.jpg"
              alt="subhub"
            />
            <div className="subhub-name">
              <h1>SubHub Name</h1>
            </div>
          </div>
        </section>
        <section className="links">
          <div className="links-container">
            <Link to="/subhub/postfeed" className="subhub-links">
              Posts
            </Link>
            <Link to="/subhub/chat" className="subhub-links">
              Chat
            </Link>
          </div>
        </section>
        <Switch>
          {/* TODO!! CHANGE THIS FIRST ROUTE TO A RENDER ROUTE FOR SUB HUB ID */}
          <Route path="/subhub/postfeed" component={PostFeed} />
          <Route path="/subhub/chat" component={Chat} />
        </Switch>
      </div>
    )
  }
}

export default SubHub
