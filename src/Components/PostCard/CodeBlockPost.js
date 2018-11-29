import React from 'react'
import Markdown from 'react-markdown'
import Highlight from 'react-highlight'
import '../../../node_modules/highlight.js/styles/a11y-dark.css'

function CodeBlockPost(props) {
  return (
    <Highlight className="javascript">
      <Markdown source={props.post.code} />
    </Highlight>
  )
}
export default CodeBlockPost
