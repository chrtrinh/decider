import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/selectedUser'
import Chat from './Chat'
import SideBar from './SideBar'
import UserBar from './UserBar'

const Media = props => {
  const [sideBar, setSideBar] = useState(false)

  const onClick = () => {
    setSideBar(!sideBar)
  }

  return (
    <div className="media">
      <div className="media__top">
        <UserBar onClick={onClick} />
      </div>
      <div className="media__bottom">
        <div
          className={
            sideBar ? 'media__bottom__left' : 'media__bottom__left__active'
          }
        >
          <Chat
            data={props}
            sendMessage={props.sendMessage}
            sendLike={props.sendLike}
          />
        </div>
        <div
          className={
            sideBar ? 'media__bottom__right' : 'media__bottom__right__active'
          }
        >
          <SideBar />
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: userId => dispatch(updateUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Media)
