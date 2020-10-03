import {Avatar} from '@material-ui/core'
import React from 'react'

const Message = props => {
  const {message, user} = props.message
  const {imageUrl, firstName} = user

  return (
    <div className="message">
      <div className="message__left">
        <Avatar alt={firstName} src={imageUrl} />
      </div>
      <div className="message__right">
        <div className="message__body">
          <h4>{message}</h4>
        </div>
      </div>
    </div>
  )
}

export default Message
