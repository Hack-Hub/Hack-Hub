import React, { Component } from 'react'
import './App.scss'
import Nav from './Components/Nav/Nav'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { currentUser: null, currentUserInfo: {} }
  }

  componentDidMount() {
    this.getUserId()
  }

  getUserId() {
    axios.get('/api/currentUser').then(response => {
      // console.log('response', response)
      this.setState({ currentUser: response.data[0] })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
