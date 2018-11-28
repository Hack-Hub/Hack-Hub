import React from 'react'

function TextPost(props) {
  return (
      <p className="text">{props.post.text_content}</p>
  )
}
export default TextPost
