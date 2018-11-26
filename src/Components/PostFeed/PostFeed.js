import React, { Component } from 'react'
import PostCard from '../PostCard/PostCard'
import './PostFeed.scss'

class PostFeed extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.posts !==prevProps.posts){
      this.setState({posts:this.props.posts})
    }
  }
  render() {
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
