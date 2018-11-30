import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import './Dashboard.scss'
import axios from 'axios'
import PostFeed from '../PostFeed/PostFeed'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      postVotes: [],
    }
  }

  componentDidMount() {
    // this.getPostByVoteCount()
    axios.get('/api/getPosts').then(response => {
      this.setState({ posts: response.data })
    })
    // this.getPostByTime()
    axios.get('/api/orderPostsByVote').then(response => {
      const votePosts = Object.values(response.data)
      this.setState({ postVotes: votePosts })
    })
  }

  render() {
    return (
      <div className="Dashboard--container">
        <div className="order-buttons">
          <Link to="/dashboard/voteCount">Most Votes</Link>
          <div className="vertical-ruler" />
          <Link to="/dashboard/time">Most Recent</Link>
        </div>

        <Switch>
          <Route path="/dashboard/time" render={() => <PostFeed posts={this.state.posts} />} />
          <Route
            path="/dashboard/voteCount"
            render={() => <PostFeed posts={this.state.postVotes} />}
          />
        </Switch>
      </div>
    )
  }
}
export default Dashboard
