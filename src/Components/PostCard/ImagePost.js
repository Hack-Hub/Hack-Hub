import React from  "react";


function ImagePost(props) {
    const {image_url,post_date_time,post_id,subhub_id,title,user_id} = props.post
    return (
      <div className="PostCard--container">
        <section className="Card--section--header">
          <div className="left-postcard">
            <div className="user-image" />
            <h1>{title}</h1>
          </div>
          <div className="right-postcard">
            <div className="time-stamp">{post_date_time}</div>
          </div>
        </section>
        <section className="Card--section--body">
          <p className="image">
            <img src={image_url} alt=''/>
          </p>
        </section>
        <section className="votes">
        {/* bring in votes component here */}
          <i className="fa fa-2x fa-arrow-up" />
          <p>1234</p>
          <i className="fa fa-2x fa-arrow-down" />
        </section>
      </div>
    )
}
export default ImagePost;
