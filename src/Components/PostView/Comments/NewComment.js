import React, { Component } from 'react'
import axios from 'axios'
import './Comments.scss'

class NewComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_text: '',
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
  }

  handleChange = event => {
    this.setState({ comment_text: event.target.value })
  }

  render() {
    return (
      <div className="New-Comment--Container">
        <h3>New Comment</h3>
        <textarea
          onChange={this.handleChange}
          placeholder="type here..."
          value={this.state.comment_text}
        />
        <button onClick={this.handlePost}>Post Comment</button>
      </div>
    )
  }
}

export default NewComment
