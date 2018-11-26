import React from 'react'
import { Link } from 'react-router-dom'

function TextPost(props) {
  const {
    post_date_time,
    post_id,
    subhub_id,
    text_content,
    title,
    user_id,
    sh_name,
    // user,
    username,
    user_photo,
  } = props.post
  const date = new Date(post_date_time)
  return (
    <div className="PostCard--container">
      <section className="Card--section--header">
        <div className="left-postcard">
          <img src={user_photo} alt="user" className="user-image" />
          <Link to={`/user/${user_id}`}>
            <h1>{username}</h1>
          </Link>
        </div>
        <div className="right-postcard">
          <div className="subhub-name">
            <Link to={`/subhub/${subhub_id}/postfeed`}>{sh_name}</Link>
          </div>
          <div className="time-stamp">{date.toDateString()}</div>
        </div>
      </section>
      <section className="Card--section--body">
        <Link to={`/postview/${post_id}`}>
          <h1>{title}</h1>
        </Link>
        <p className="text">{text_content}</p>
      </section>
      <section className="bottom">
        <div className="votes-section">
          {/* bring in votes component here */}
          <i className="fa fa-2x fa-arrow-up" />
          <p>1234</p>
          <i className="fa fa-2x fa-arrow-down" />
        </div>
        {/* <div className="user">
          <p>
            user: <span>{username}</span>
          </p>
        </div> */}
      </section>
    </div>
  )
}
export default TextPost
