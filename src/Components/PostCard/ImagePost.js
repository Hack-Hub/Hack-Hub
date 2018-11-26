import React from 'react'
import { Link } from 'react-router-dom'

function ImagePost(props) {
  const {
    image_url,
    post_id,
    title,
  } = props.post
  return (
      <section className="Card--section--body">
        <Link to={`/postview/${post_id}`}>
          <h1>{title}</h1>
        </Link>
        <p className="image">
          <img src={image_url} alt="" />
        </p>
      </section>      
  )
}
export default ImagePost
