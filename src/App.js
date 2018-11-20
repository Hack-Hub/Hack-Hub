import React, { Component } from 'react'
import './App.scss'
import Nav from './Components/Nav/Nav'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { currentUser: null, isLoggedIn: false }
    this.getUser = this.getUser.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      this.getUser()
    }
  }

  getUser() {
    axios.get('/api/currentUser').then(response => {
      this.setState({ currentUser: response.data[0] })
    })
  }

  setLoggedIn() {
    this.setState({ isLoggedIn: true })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.currentUser} loggedIn={this.state.isLoggedIn} />
          <div className="Routes">
            <Routes user={this.state.currentUser} setLoggedIn={this.setLoggedIn} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
