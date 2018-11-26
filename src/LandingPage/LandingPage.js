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
            Dale a tu cuerpo alegria Macarena Que tu cuerpo es pa' darle alegria cosa buena Dale a
            tu cuerpo alegria, Macarena Hey Macarena! Dale a tu cuerpo alegria Macarena Que tu
            cuerpo es pa' darle alegria cosa buena Dale a tu cuerpo alegria, Macarena Hey Macarena!
          </p>

          <div className="buttons">
            <Link to="/dashboard">Explore</Link>
            <Link to="/signIn">Sign In</Link>
          </div>
        </section>
      </div>
    )
  }
}
