import React, { Component } from "react";
import "./Comments.scss";
import NewComment from "./NewComment";

class DisplayComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      replyMode: false,
      collapseMode:false
    };
  }
  handleReplyToggle = () => {
    this.setState({ replyMode: !this.state.replyMode });
  };
  handleCollapseToggle = () =>{
    this.setState({ collapseMode: !this.state.collapseMode });
  }
  render() {
    const commentDate = new Date(this.props.comment.comment_date_time);
    const time = commentDate.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    let reply, commentBox;
    if (this.props.comment.children.length && !this.state.collapseMode) {
      reply = (
        <Comment
        comments={this.props.comment.children}
        updateReply={this.props.updateReply}
        />
        );
      }
    if (this.state.replyMode) {
      commentBox = (
        <NewComment
          post_id={this.props.comment.post_id}
          parent_id={this.props.comment.comment_id}
          updateReply={this.props.updateReply}
        />
      );
    } else {
      commentBox = null;
    }
    return (
      <div style={{ background: "red" }}>
        <h1>{this.props.comment.comment_text}</h1>
        <h3>{commentDate.toDateString()}</h3>
        <h3>{time}</h3>
        <button onClick={this.handleReplyToggle}>Reply</button>
        <button onClick={this.handleCollapseToggle}>Collapse Replies</button>
        {commentBox}
        {reply}
      </div>
    );
  }
}

class Comment extends Component {
  render() {
    return (
      <div className="individual-comment" style={{ background: "green" }}>
        {this.props.comments.map(comment => {
          return (
            <DisplayComments
              key={comment.comment_id}
              comment={comment}
              updateReply={this.props.updateReply}
            />
          );
        })}
      </div>
    );
  }
}

export default Comment;
