import React from 'react'
import './ErrorMessage.scss'

const ErrorMessage = props => {
  return (
    <div className="ErrorMessage--container">
      <p>{props.message}</p>
    </div>
  )
}
export default ErrorMessage
