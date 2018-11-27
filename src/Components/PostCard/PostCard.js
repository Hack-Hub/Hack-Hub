import React, { Component } from "react";
import "./PostCard.scss";
import { Link } from "react-router-dom";
import Votes from "../Votes/Votes";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";
import URLPost from "./URLPost";

class PostCard extends Component {
  render() {
    const{ post }= this.props

    let postType = null;
    if (post.text_content) {
      postType = <TextPost post={this.props.post} />;
    }
    if (post.image_url) {
      postType = <ImagePost post={this.props.post} />;
    }
    if (post.web_url) {
      postType = <URLPost post={this.props.post} />;
    }

    return (
      <div className="PostCard--container">
        <section className="Card--section--header">
          <div className="left-postcard">
            <img src={post.user_photo} alt="user" className="user-image" />
            <Link to={`/user/${post.user_id}`}>
              <h1>{post.username}</h1>
            </Link>
          </div>
          <div className="right-postcard">
            <div className="subhub-name">
              <Link to={`/subhub/${post.subhub_id}/postfeed`}>
                {post.sh_name}
              </Link>
            </div>
            <div className="time-stamp">{post.post_date_time}</div>
          </div>
        </section>

        {/* Post Type */}
        {postType}
        <section className="bottom">
          {/* Votes */}
          <Votes votes={post.votes} post_id={post.post_id} />
        </section>
      </div>
    );
  }
}
export default PostCard;
