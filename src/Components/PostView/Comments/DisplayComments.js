import React, { Component } from 'react'

class DisplayComments extends Component {
  render() {
    const commentDate = new Date(this.props.comment.comment_date_time)
    const time = commentDate.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })

    console.log('time', time)
    if (this.props.comment.children.length) {
      return (
        <div>
          <h1>{this.props.comment.comment_text}</h1>
          <h3>{commentDate.toDateString()}</h3>
          <h3>{time}</h3>
          <Comment comments={this.props.comment.children} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.comment.comment_text}</h1>
          <h3>{commentDate.toDateString()}</h3>
          <h3>{time}</h3>
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
