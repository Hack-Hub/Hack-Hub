import React, { Component } from 'react'
import axios from 'axios'
import PostCard from '../PostCard/PostCard'
import './PostFeed.scss'

class PostFeed extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    //to-do:axios get call
    axios.get('/api/getPosts/').then(response => {
      this.setState({ posts: response.data })
    })
  }

  render() {
    console.log('this.state.posts', this.state.posts)
    let postMap = []
    if (this.state.posts !== []) {
      postMap = this.state.posts.map((post, idx) => {
        return <PostCard post={post} key={idx} />
      })
    }
    return <div className="PostFeed--container">{postMap}</div>
  }
}
export default PostFeed
