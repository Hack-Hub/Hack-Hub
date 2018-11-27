import React, { Component } from 'react'
import './Comments.scss'
import axios from 'axios'

class DisplayComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
    }
  }

  render() {
    const commentDate = new Date(this.props.comment.comment_date_time)
    const time = commentDate.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
      return (
        <div style={{ background: 'red' }}>
          <h1>{this.props.comment.comment_text}</h1>
          <h3>{commentDate.toDateString()}</h3>
          <h3>{time}</h3>

          <textarea
            value={this.state.commentText}
            onChange={event => this.setState({ commentText: event.target.value })}
            placeholder="reply..."
          />

          <button
            onClick={() =>
              axios
                .post('/api/newComment', {
                  post_id: this.props.comment.post_id,
                  comment_text: this.state.commentText,
                  parent_comment_id: this.props.comment.comment_id,
                })
                .then(this.props.updateReply())
            }
          >
            COMMENT
          </button>
         {this.props.comment.children.length && <Comment comments={this.props.comment.children} updateReply={this.props.updateReply} />} 
        </div>
      )
    }
}

class Comment extends Component {
  render() {
    return (
      <div className="individual-comment" style={{ background: 'green' }}>
        {this.props.comments.map(comment => {
          return (
            <DisplayComments
              key={comment.comment_id}
              comment={comment}
              updateReply={this.props.updateReply}
            />
          )
        })}
      </div>
    )
  }
}

export default Comment
