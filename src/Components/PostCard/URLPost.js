import React from 'react'

function URLPost(props) {
  return (
      <p className="URL">
        <a href={props.post.web_url} id="" target="_blank" rel="noopener noreferrer">
          {props.post.web_url} <i className="fa fa-1x fa-external-link"/>
        </a>
      </p>
  )
}
export default URLPost
