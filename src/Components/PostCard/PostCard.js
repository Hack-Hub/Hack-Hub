import React, { Component } from 'react'
import './PostCard.scss'
import { Link } from 'react-router-dom'

class PostCard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    console.log('this.props', this.props)
    const { postTitle, postContent, timePosted, postId } = this.props
    return (
      <div className="PostCard--container">
        <section className="Card--section--header">
          <div className="left-postcard">
            <div className="user-image" />
            <Link to={`/postview/${postId}`}>
              <h1>{postTitle}</h1>
            </Link>
          </div>
          <div className="right-postcard">
            <div className="time-stamp">{timePosted}</div>
          </div>
        </section>
        <section className="Card--section--body">
          <p className="text">{postContent}</p>
        </section>
        <section className="votes">
          <i className="fa fa-2x fa-arrow-up" />
          <p>1234</p>
          <i className="fa fa-2x fa-arrow-down" />
        </section>
      </div>
    )
  }
}
export default PostCard
