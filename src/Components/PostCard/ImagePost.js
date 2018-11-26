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
    votes
  } = props.post

  const date = new Date(post_date_time)

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
        <p className="image">
          <img src={image_url} alt="" />
        </p>
      </section>
      <section className="bottom">
      <Votes votes={votes} post_id={post_id}/>
      </section>
    </div>
  )
}
export default ImagePost
