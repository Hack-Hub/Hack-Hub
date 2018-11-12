import React, { Component } from 'react'
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
          <img src="http://i64.tinypic.com/ndplcw.jpg" alt="logo-2" />
          <h3>Welcome to Hack-Hub</h3>

          <div className="buttons">
            {/* TODO!!! Replace a tag with Link after setting up route */}
            <a>Explore</a>

            {/* TODO!!! Replace a tag with Link after setting up route */}
            <a>Sign In</a>
          </div>
        </section>
      </div>
    )
  }
}
