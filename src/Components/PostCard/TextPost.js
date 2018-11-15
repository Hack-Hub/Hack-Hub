import React from 'react'
import { Link } from 'react-router-dom'

function TextPost(props) {
  console.log('props', props)
  const { post_date_time, post_id, subhub_id, text_content, title, user_id, sh_name } = props.post
  return (
    <div className="PostCard--container">
      <section className="Card--section--header">
        <div className="left-postcard">
          <div className="user-image" />
          <h1>{title}</h1>
        </div>
        <div className="right-postcard">
          <div className="subhub-name">
            <Link to={`/subhub/${subhub_id}`}>SubHub: {sh_name}</Link>
          </div>
          <div className="time-stamp">{post_date_time}</div>
        </div>
      </section>
      <section className="Card--section--body">
        <p className="text">{text_content}</p>
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
export default TextPost
