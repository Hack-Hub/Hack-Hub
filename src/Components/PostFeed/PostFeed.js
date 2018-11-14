import React, { Component } from 'react'
import axios from 'axios'
import './PostFeed.scss'

class PostFeed extends Component {
  constructor() {
    super()
    this.state = {
      posts:[]
    }
  }

  componentDidMount(){
    //to-do:axios get call
    axios.get('/api/getPosts/'+this.props.subhub_id)
      .then((response)=>{
        console.log(response.data);
        this.setState({posts:response.date})
      })
  }

  render() {
    return <div className="PostFeed--container">POSTFEED</div>
  }
}
export default PostFeed
