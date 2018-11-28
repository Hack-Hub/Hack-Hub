import React, { Component } from 'react'
import NewComment from './NewComment'
import axios from 'axios'
import './Comments.scss'
import Comment from './DisplayComments'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      commentsArray: [],
    }

    this.updateReply = this.updateReply.bind(this)
  }

  //get comments once post has loaded
  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      axios.get('/api/getcomments/' + this.props.post.post_id).then(comments => {
        this.commentSetUp(comments.data)
      })
    }
  }

  commentSetUp = commentsArr => {
    let ParentComments = commentsArr
    this.setState({ commentsArray: ParentComments })
    ParentComments = ParentComments.map(comment => {
      comment.children = []
      return comment
    })
    ParentComments = ParentComments.filter(comment => {
      if (!comment.parent_comment_id) {
        this.findChildren(comment, commentsArr)
      }
      return !comment.parent_comment_id
    })
    this.setState({ comments: ParentComments })
  }

  findChildren = (comment, commentsArr) => {
    for (let i = 0; i < commentsArr.length; i++) {
      if (comment.comment_id === commentsArr[i].parent_comment_id) {
        this.findChildren(commentsArr[i], commentsArr)
        comment.children.push(commentsArr[i])
      }
    }
    return null
  }

  updateReply() {
    console.log('update reply')
    axios.get('/api/getcomments/' + this.props.post.post_id).then(comments => {
      this.commentSetUp(comments.data)
    })
  }

  render() {
    const lastChild = this.state.commentsArray.filter((comment, idx) => {
      console.log('comment.children', comment.children)
      return comment.children && !comment.children.length
    })
    console.log('lastChild', lastChild)

    return (
      <div className="Comments--container">
        <NewComment
          post_id={this.props.post.post_id}
          parent_id={null}
          updateReply={this.updateReply}
          userId={this.props.userId}
        />

        <div className="comments">
          <h3>Comments</h3>
          <div className="ruler" />

          <Comment
            // commentsArray={this.state.commentsArray}
            lastChild={lastChild}
            comments={this.state.comments}
            updateReply={this.updateReply}
            style={{ marginTop: '200px' }}
          />
        </div>
      </div>
    )
  }
}

export default Comments
