import React, { Component } from 'react'
import './PostCard.scss'
import { Link } from 'react-router-dom'
import Votes from '../Votes/Votes'
import TextPost from './TextPost'
import ImagePost from './ImagePost'
import VideoPost from './VideoPost'
import URLPost from './URLPost'
import CodeBlockPost from './CodeBlockPost'

class PostCard extends Component {
  render() {
    console.log('this.props', this.props)
    const { post } = this.props

    let postType = null
    if (post.text_content) {
      postType = <TextPost post={this.props.post} />
    }
    if (post.image_url) {
      postType = <ImagePost post={this.props.post} />
    }
    if (post.web_url) {
      postType = <URLPost post={this.props.post} />
    }
    if (post.video_url) {
      postType = <VideoPost post={this.props.post} />
    }
    if (post.code) {
      postType = <CodeBlockPost post={this.props.post} />
    }

    const date = new Date(post.post_date_time)

    const time = date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div className="PostCard--container">
        <section className="Card--section--header">
          <div className="left-postcard">
            <img src={post.user_photo} alt="user" className="user-image" />
            <Link to={`/user/${post.user_id}`}>
              <h1>{post.username}</h1>
            </Link>
          </div>

          <div className="right">
            <p className="desc-font" style={{ textTransform: 'uppercase' }}>
              <Link to={`/subhub/${post.subhub_id}/postfeed`}>{post.sh_name}</Link> <span>| </span>
              {time} <span>| </span>
              {date.toDateString()}
            </p>
          </div>
        </section>
        <section className="Card--section--body">
          <Link to={`/postview/${post.post_id}`}>
            <h1>{post.title}</h1>
          </Link>
          {/* Post Type */}
          {postType}
        </section>
        <section className="bottom">
          {/* Votes */}
          <Votes votes={post.votes} post_id={post.post_id} />
        </section>
      </div>
    )
  }
}
export default PostCard
