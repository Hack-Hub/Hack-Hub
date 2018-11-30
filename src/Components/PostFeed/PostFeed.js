import React, { Component } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostFeed.scss";
import axios from "axios";

class PostFeed extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userId: null
    };
  }
  componentDidMount() {
    axios.get("/api/currentUser").then(response => {
      if (!response.data.length) {
        return;
      } else {
        this.setState({ userId: response.data[0].user_id });
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      this.setState({ posts: this.props.posts });
    }
  }
 
  render() {
    let postMap = [];
    if (this.state.posts !== []) {
      postMap = this.state.posts.map((post, idx) => {
        return (
          <PostCard
            post={post}
            key={idx}
            userId={this.state.userId}
          />
        );
      });
    }
    return (
      <div className="PostFeed--container">
        {" "}
      
        {postMap}
      </div>
    );
  }
}
export default PostFeed;
