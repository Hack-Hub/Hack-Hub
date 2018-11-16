import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Nav.scss'
// import { Auth } from 'aws-amplify'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      searchResults: '',
      randomState: true,
      isLoggedIn: false,
      random: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.reRenderResultsPage = this.reRenderResultsPage.bind(this)
    this.handleRandomState = this.handleRandomState.bind(this)
  }

  handleChange(event) {
    this.setState({ searchResults: event.target.value })
  }

  reRenderResultsPage(selectedPage) {
    window.location.reload(selectedPage)
  }

  handleRandomState(event) {
    this.setState({ randomState: !event })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.props', this.props)
    if (prevProps.user !== this.props.user) {
      this.setState({ isLoggedIn: this.props.isLoggedIn })
    }
  }

  render() {
    const currentUser = this.props.user && this.props.user.user_id !== ''
    // console.log('this.props', this.props)
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
          {currentUser ? (
            <Link onClick={() => this.handleRandomeState()} to="/signOut">
              Sign Out
            </Link>
          ) : (
            <Link to="/signIn">Sign In</Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Nav)
