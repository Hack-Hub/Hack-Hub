import React, { Component } from "react";

class DisplayComments extends Component {
  render() {
      console.log('this.props',this.props);
      if(this.props.comment.children.length){
          return (
            <div>
                <h1>{this.props.comment.comment_text}</h1>
                <Comment comments={this.props.comment.children}/>
            </div>
          );
      }else{
        return (
            <div>
                <h1>{this.props.comment.comment_text}</h1>
            </div>
          );
      }
  }
}
class Comment extends Component{
    render() {
        return (
          <div>
              {this.props.comments.map(comment=>{
                  return <DisplayComments key={comment.comment_id} comment={comment}/>
              })}
          </div>
        );
      }
}

export default Comment;
