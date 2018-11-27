import React, { Component } from 'react'
import './Comments.scss'
import NewComment from './NewComment'
import axios from 'axios'

class DisplayComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
      replyMode: false,
      collapseMode: false,
      currentUserId: null,
      editToggle: false,
    }
  }

  componentDidMount() {
    this.loggedInUser()
    this.setState({ commentText: this.props.comment.comment_text })
  }

  handleReplyToggle = () => {
    this.setState({ replyMode: !this.state.replyMode })
  }
  handleCollapseToggle = () => {
    this.setState({ collapseMode: !this.state.collapseMode })
  }

  loggedInUser = () => {
    axios.get('/api/currentUser').then(res => {
      this.setState({ currentUserId: res.data[0].user_id })
    })
  }

  deleteComment = async () => {
    axios
      .delete(`/api/deleteComment/${this.props.comment.comment_id}`)
      .then(await this.props.updateReply())
  }

  editComment = () => {
    console.log('hi')
    axios.put(`/api/editComment/${this.props.comment.comment_id}`, {
      post_id: this.props.comment.post_id,
      comment_text: this.state.commentText,
    })
  }

  render() {
    const commentDate = new Date(this.props.comment.comment_date_time)
    const time = commentDate.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
    let reply, commentBox
    if (this.props.comment.children.length && !this.state.collapseMode) {
      reply = (
        <Comment comments={this.props.comment.children} updateReply={this.props.updateReply} />
      )
    }
    if (this.state.replyMode) {
      commentBox = (
        <NewComment
          post_id={this.props.comment.post_id}
          parent_id={this.props.comment.comment_id}
          updateReply={this.props.updateReply}
        />
      )
    } else {
      commentBox = null
    }

    console.log('this.props', this.props)
    const loggedInUser = this.props.comment.user_id === this.state.currentUserId

    return (
      <div className="comment-container" style={{ background: 'red' }}>
        <div className="left-of-bubble">
          <img src={this.props.comment.user_photo} alt="user" />
        </div>
        <div className="bubble talk-bubble tri-right border btm-right-in">
          <div className="bubble-content">
            {this.state.editToggle ? (
              <div>
                <input
                  value={this.state.commentText}
                  onChange={event => this.setState({ commentText: event.target.value })}
                />
                <button onClick={() => this.editComment()}>submit</button>
              </div>
            ) : (
              <h1>{this.props.comment.comment_text}</h1>
            )}
            <h3>{commentDate.toDateString()}</h3>
            <h3>{time}</h3>
            {loggedInUser && (
              <div>
                <button onClick={() => this.deleteComment()}>delete</button>
                <button onClick={() => this.setState({ editToggle: !this.state.editToggle })}>
                  edit
                </button>
              </div>
            )}

            <button onClick={this.handleReplyToggle}>Reply</button>
            <button onClick={this.handleCollapseToggle}>Collapse Replies</button>
          </div>

          {/* Reply button being rendered toggles commentBox  */}
          {commentBox}
          {reply}
        </div>
      </div>
    )
  }
}

class Comment extends Component {
  render() {
    return (
      <div className="individual-comment">
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
