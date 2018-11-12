import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'

class Nav extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="Nav--container">
        <div className="left-nav">
          <img className="nav-logo" src="http://i65.tinypic.com/25rphk4.png" alt="hack-hub-logo" />
        </div>

        <div className="right-nav">
          <div className="search-bar">
            <input className="search-input" />
            <button className="search-button">
              <i className="fa fa-2x fa-search" />
            </button>
          </div>
          <div className="vertical-bar" />
          {/* TODO!! CHANGE 'a' tag to 'Link' once routes are set up */}
          <a>
            <i className="fa fa-2x fa-pencil" />
          </a>
          {/* TODO!! CHANGE 'a' tags to 'Link' once routes are set up */}
          <a>
            <i className="fa fa-2x fa-plus-square" />
          </a>
          {/* TODO!! CHANGE 'a' tags to 'Link' once routes are set up */}
          <Link to="/authenticate">Sign In</Link>
        </div>
      </div>
    )
  }
}

export default Nav
