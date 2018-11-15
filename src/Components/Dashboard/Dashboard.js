import React, { Component } from 'react'
import './Dashboard.scss'
import PostCard from '../PostCard/PostCard'
import PostFeed from '../PostFeed/PostFeed';

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="Dashboard--container">
        <div className="Postcard--container">
          {/* <PostCard />
          <PostCard />
          <PostCard /> */}
          <PostFeed/>
        </div>
      </div>
    )
  }
}
export default Dashboard
