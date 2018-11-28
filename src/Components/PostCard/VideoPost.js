import React from 'react'

function VideoPost(props) {
  return (
      <p className="image">
       <video width="576" height="432" autoPlay controls loop>
        <source src={`${props.post.video_url}.mp4`} type="video/mp4"/>
       </video>
      </p>
  )
}
export default VideoPost
