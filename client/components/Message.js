import {Avatar} from '@material-ui/core'
import React from 'react'

const sample = {
  name: 'Christopher Trinh',
  imageUrl:
    'https://avatars1.githubusercontent.com/u/27032995?s=400&u=45fc9d76050a352834fa9e8868d174defaeb6d1c&v=4',
  lastMsg:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

const Message = props => {
  const {message, user} = props.message
  const {id, imageUrl, firstName} = user

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
