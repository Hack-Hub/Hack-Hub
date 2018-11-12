import React, { Component } from 'react'
import './App.scss'
import Nav from './Components/Nav/Nav'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
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
