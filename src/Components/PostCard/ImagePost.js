import React from 'react'

function ImagePost(props) {
  return (
      <p className="image">
        <img src={props.post.image_url} alt="" />
      </p>
  )
}
export default ImagePost
