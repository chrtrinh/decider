import {Avatar} from '@material-ui/core'
import React from 'react'

const Message = props => {
  const {loggedInUser} = props
  const {message, user, timeStamp} = props.message
  const {imageUrl, firstName, id} = user

  let time = timeStamp.toString()
  time = time.slice(time.indexOf('T') + 1)
  time = time.slice(0, time.indexOf('.'))
  time = time.slice(0, time.length - 3)

  return (
    <div className={id === loggedInUser.id ? 'message' : 'message__receiver'}>
      <div
        className={
          id === loggedInUser.id ? 'message__left' : 'message__receiver__left'
        }
      >
        <Avatar alt={firstName} src={imageUrl} />
      </div>
      <div
        className={
          id === loggedInUser.id ? 'message__right' : 'message__receiver__right'
        }
      >
        <div
          className={
            id === loggedInUser.id ? 'message__body' : 'message__body__receiver'
          }
        >
          <h4>{message}</h4>
          <h6>{time}</h6>
        </div>
      </div>
    </div>
  )
}

export default Message
