import React from 'react'
import Avatar from '@material-ui/core/Avatar'

const ChatCard = ({user}) => {
  return (
    <div className="chatCard">
      <div className="chatCard__left">
        <Avatar alt={user.firstName} src={user.imageUrl} />
      </div>
      <div className="chatCard__right">
        <div className="chatCard__right__container">
          <h4>
            {user.firstName} {user.lastName}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default ChatCard
