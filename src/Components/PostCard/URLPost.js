import React from 'react'

function URLPost(props) {
  return (
      <p className="URL">
        <a href={props.post.web_url} target="_blank" rel="noopener noreferrer">
          {props.post.web_url}
        </a>
      </p>
  )
}
export default URLPost
