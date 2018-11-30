import React, { Component } from 'react'
import axios from 'axios'
import './Comments.scss'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

class NewComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_text: '',
      commentError: '',
    }
  }

  handlePost = () => {
    const { post_id, parent_id } = this.props
    const { comment_text } = this.state
    axios
      .post('/api/newComment', {
        post_id: post_id,
        comment_text: comment_text,
        parent_comment_id: parent_id,
      })
      .then(() => {
        this.setState({ comment_text: '' })
      })
      .then(this.props.updateReply())
  }

  handleChange = event => {
    this.setState({ comment_text: event.target.value })
  }

  render() {
    return (
      <div className="New-Comment--Container">
        <textarea
          onChange={this.handleChange}
          placeholder="New Comment..."
          value={this.state.comment_text}
          style={{ fontFamily: 'Montserrat', padding: '10px' }}
          className="desc-font"
        />
        {this.state.userId === null && (
          <div style={{ background: '#f5f5f5' }}>
            {this.state.commentError && <ErrorMessage message={this.state.commentError} />}
          </div>
        )}
        <button
          className="primary-button post"
          onClick={() => {
            if (this.props.userId === null) {
              this.props.handleNullUser()
            } else {
              this.handlePost()
            }
          }}
        >
          Post
        </button>
      </div>
    )
  }
}

export default NewComment
