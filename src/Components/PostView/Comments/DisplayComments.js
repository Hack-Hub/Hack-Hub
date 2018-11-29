import React, { Component } from 'react'
import './Comments.scss'
import NewComment from './NewComment'
import axios from 'axios'
import { CommentStyle } from './CommentStyle'

class DisplayComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
      replyMode: false,
      collapseMode: false,
      currentUserId: null,
      editToggle: false,

      // commentsArray: [],
    }
  }

  componentDidMount() {
    this.loggedInUser()
    this.setState({ commentText: this.props.comment.comment_text })
    // this.getCommentsArray()
  }

  // getCommentsArray = () => {
  //   axios.get('/api/getcomments/' + this.props.comment.post_id).then(res => {
  //     this.setState({ commentsArray: res.data })
  //   })
  // }

  handleReplyToggle = () => {
    this.setState({ replyMode: !this.state.replyMode })
  }
  handleCollapseToggle = () => {
    this.setState({ collapseMode: !this.state.collapseMode })
  }

  loggedInUser = () => {
    axios.get('/api/currentUser').then(res => {
      if (!res.data.length) {
        this.setState({ currentUserId: null })
      } else {
        this.setState({ currentUserId: res.data[0].user_id })
      }
    })
  }

  deleteComment = async () => {
    axios
      .delete(`/api/deleteComment/${this.props.comment.comment_id}`)
      .then(await this.props.updateReply())
  }

  editComment = () => {
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
    let displayChildren, commentBox;
    let marginLength = 0;
    if (this.props.comment.children.length && !this.state.collapseMode) {
      marginLength = marginLength +=this.props.comment.childrenInt*70;
      displayChildren = (
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

    const loggedInUser = this.props.comment.user_id === this.state.currentUserId

    return (
        <CommentStyle lastChild={this.props.lastChild} className="comment-container" style={{paddingBottom:marginLength}} >
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
              <div className="date-and-time">
                <h3>{commentDate.toDateString()}</h3>
                <h3>{time}</h3>
              </div>
              {loggedInUser && (
                <div className="edit-comment">
                  <button onClick={() => this.deleteComment()}>Delete</button>
                  <button onClick={() => this.setState({ editToggle: !this.state.editToggle })}>
                    Edit
                  </button>
                </div>
              )}

              <div className="reply-and-collapse">
                <button onClick={this.handleReplyToggle}>Reply</button>
                <button onClick={this.handleCollapseToggle}>Collapse Replies</button>
              </div>
            </div>

            {/* Reply button being rendered toggles commentBox  */}
            {commentBox}
            {displayChildren}
          </div>
        </CommentStyle>
    )
  }
}

class Comment extends Component {
  render() {
    return (
      <div > 
        {this.props.comments.map(comment => {
          return (
            <DisplayComments
              lastChild={this.props.lastChild}
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
