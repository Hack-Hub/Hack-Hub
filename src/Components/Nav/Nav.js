import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { Auth } from 'aws-amplify'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: '',
      userId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.reRenderResultsPage = this.reRenderResultsPage.bind(this)
  }

  handleChange(event) {
    this.setState({ searchResults: event.target.value })
  }

  reRenderResultsPage(selectedPage) {
    window.location.reload(selectedPage)
  }

  signOut = async () => {
    // const { username, password, email, phone_number } = this.state
    try {
      await Auth.signOut()
        .then(data => console.log('data', data))
        .then(this.setState({ userId: '' }))
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('this.props', this.props)
    const currentUser = this.state.userId !== ''

    return (
      <div className="Nav--container">
        <div className="left-nav">
          <Link to="/">
            <img
              className="nav-logo"
              src="http://i65.tinypic.com/25rphk4.png"
              alt="hack-hub-logo"
            />
          </Link>
        </div>

        <div className="right-nav">
          <div className="search-bar">
            <input className="search-input" name="searchResults" onChange={this.handleChange} />
            <Link
              to={`/searchResults/${this.state.searchResults}`}
              onClick={selectedPage => this.reRenderResultsPage(selectedPage)}
            >
              <i className="fa fa-2x fa-search" />
            </Link>
            {/* <Link to={{pathname: '/searchResults',}}/> */}
          </div>
          <div className="vertical-bar" />
          <Link to="/newpost">
            <i className="fa fa-2x fa-pencil" />
          </Link>
          <Link to="/newsubhub">
            <i className="fa fa-2x fa-plus-square" />
          </Link>
          <Link to="/authenticate">Sign Up</Link>
          {currentUser ? <button>Sign Out</button> : <Link to="/signIn">Sign In</Link>}
          {/* // <Link to="/signIn">Sign In</Link> */}
        </div>
      </div>
    )
  }
}

export default Nav
