import React from 'react'
import { Link } from 'react-router-dom'

function TextPost(props) {
  const { post_id, text_content, title } = props.post

  return (
    <section className="Card--section--body">
      <Link to={`/postview/${post_id}`}>
        <h1>{title}</h1>
      </Link>
      <p className="text">{text_content}</p>
    </section>
  )
}
export default TextPost
