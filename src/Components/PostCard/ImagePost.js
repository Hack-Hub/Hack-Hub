import React from 'react'
import { Link } from 'react-router-dom'
import Votes from '../Votes/Votes'

function ImagePost(props) {
  const {
    image_url,
    post_date_time,
    post_id,
    subhub_id,
    title,
    user_id,
    sh_name,
    username,
    user_photo,
    votes,
  } = props.post

  const date = new Date(post_date_time)

  const time = date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="PostCard--container">
      <section className="Card--section--header">
        <div className="left-postcard">
          {/* <div className="user-image"> */}
          <img src={user_photo} alt="user" className="user-image" />
          {/* </div> */}

          <Link to={`/user/${user_id}`}>
            <h1>{username}</h1>
          </Link>
        </div>
        <div className="right-postcard right">
          <p className="desc-font">
            <Link to={`/subhub/${subhub_id}/postfeed`} style={{ letterSpacing: '1px' }}>
              {sh_name}
            </Link>
            <span> | </span>
            {time} <span>| </span>
            {date.toDateString()}
          </p>
        </div>
      </section>
      <section className="Card--section--body">
        <Link to={`/postview/${post_id}`}>
          <h1>{title}</h1>
        </Link>
        <p className="image">
          <img src={image_url} alt="" />
        </p>
      </section>
      <section className="bottom">
        <Votes votes={votes} post_id={post_id} />
      </section>
    </div>
  )
}
export default ImagePost
