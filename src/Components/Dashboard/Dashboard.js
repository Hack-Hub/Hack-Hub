import React, { Component } from 'react'
import './Dashboard.scss'
import PostFeed from '../PostFeed/PostFeed'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Dashboard--container">
        <div className="Postcard--container">
          <PostFeed />
        </div>
      </div>
    )
  }
}
export default Dashboard
