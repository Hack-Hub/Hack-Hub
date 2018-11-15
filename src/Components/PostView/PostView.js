import React, { Component } from 'react'
import './PostView.scss'
import Comments from './Comments';
import axios from 'axios';

class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post:[]
    }
  }
  componentDidMount(){
    const {postId} = this.props.match.params;
    axios.get('/api/getPostByID/'+postId)
      .then(post=>{
        this.setState({post:post.data[0]})
      })
  }
  render() {
    return (
      <div>
      <div className="PostView--container">
        <section className="subhub-container">
          <div className="theme-color" />
          <div className="subhub-container-header">
            <img src="https://i.ytimg.com/vi/USAtCfAoMio/hqdefault.jpg" alt="subhub" />
            <h3>subhub name</h3>
          </div>
        </section>
        <section className="post-container">
          <div className="theme-color" />
          <div className="post-container-header">
            <img src="https://i.ytimg.com/vi/m380BLVOrkI/hqdefault.jpg" alt="user" />
            <h3>Username Here</h3>
          </div>
        </section>
      </div>
      <Comments post={this.state.post} />
      </div>
    )
  }
}
export default PostView
