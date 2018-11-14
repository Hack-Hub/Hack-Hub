import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import axios from 'axios'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: '',
    }

    this.getAllUsers = this.getAllUsers.bind(this)
  }

  getAllUsers() {
    axios.get('/api/getAllUsers').then(response => {
      console.log('response', response)
    })
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
          <Link to="/newpost">
            <i className="fa fa-2x fa-pencil" />
          </Link>
          <Link to="/newsubhub">
            <i className="fa fa-2x fa-plus-square" />
          </Link>
          <Link to="/authenticate">Sign Up</Link>
          <Link to="/signIn">Sign In</Link>
        </div>
      </div>
    )
  }
}

export default Nav
