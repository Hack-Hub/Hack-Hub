import React from 'react'
import { Link } from 'react-router-dom'

function URLPost(props) {
  const {
    web_url,
    post_id,
    title,
  } = props.post
  return (
   
      <section className="Card--section--body">
        <Link to={`/postview/${post_id}`}>
          <h1>{title}</h1>
        </Link>
        <p className="URL">
        <a href={web_url} target="_blank" rel='noopener noreferrer' >{web_url}</a>
        </p>
      </section>
    
  )
}
export default URLPost
