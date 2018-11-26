import React, { Component } from 'react'

class DisplayComments extends Component {
  render() {
    const commentDate = new Date(this.props.comment.comment_date_time)
    if (this.props.comment.children.length) {
      return (
        <div>
          <h1>{this.props.comment.comment_text}</h1>
          <h2>{commentDate.toDateString()}</h2>
          <Comment comments={this.props.comment.children} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.comment.comment_text}</h1>
          <h2>{this.props.comment.comment_date_time}</h2>
        </div>
      )
    }
  }
}
class Comment extends Component {
  render() {
    return (
      <div>
        {this.props.comments.map(comment => {
          return <DisplayComments key={comment.comment_id} comment={comment} />
        })}
      </div>
    )
  }
}

export default Comment
