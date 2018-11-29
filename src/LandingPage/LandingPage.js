import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.scss'

export default class LandingPage extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="LandingPage--container">
        <section className="landing-section">
          <img src="https://i.imgur.com/MY2lCYx.png" alt="logo-2" />
          <h3>Welcome to Hack-Hub</h3>
          <p>
           Hack-Hub is a content and media sharing application similar to Reddit. Built for and by developers, it's the perfect place to read the latest tech news, talk to other programmers, or share the perfect meme. Click explore to see what has already been posted or sign-in to participate in the conversation.
          </p>

          <div className="buttons">
            <Link to="/dashboard/voteCount">Explore</Link>
            <Link to="/signIn">Sign In</Link>
          </div>
        </section>
      </div>
    )
  }
}
