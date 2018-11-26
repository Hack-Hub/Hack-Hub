import React, { Component } from 'react'
import './Dashboard.scss'
import axios from 'axios'
import PostFeed from '../PostFeed/PostFeed'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      posts:[]
    }
  }

  componentDidMount() {
    axios.get('/api/getPosts')
    .then(response=>{
      this.setState({posts:response.data})
    })
  }

  render() {
    return (
      <div className="Dashboard--container">
        <div className="Postcard--container">
          <PostFeed posts={this.state.posts}/>
        </div>
      </div>
    )
  }
}
export default Dashboard
