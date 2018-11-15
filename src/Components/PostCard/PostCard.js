import React, { Component } from 'react'
import './PostCard.scss'
import TextPost from './TextPost'
import ImagePost from './ImagePost'
import URLPost from './URLPost'

class PostCard extends Component {
  render() {
    // console.log(this.props)
    console.log('this.props', this.props)
    const {
      image_url,
      // post_date_time,
      // post_id,
      // subhub_id,
      text_content,
      // title,
      // user_id,
      // votes,
      web_url,
      // subhub_name,
    } = this.props.post
    if (text_content) {
      return <TextPost post={this.props.post} />
    }
    if (image_url) {
      return <ImagePost post={this.props.post} />
    }
    if (web_url) {
      return <URLPost post={this.props.post} />
    } else return null
  }
}
export default PostCard
