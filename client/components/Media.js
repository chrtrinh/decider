import React, {useEffect, useState} from 'react'
import Chat from './Chat'
import SideBar from './SideBar'
import UserBar from './UserBar'

const Media = props => {
  console.log('props, ', props)
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
          <Chat data={props} />
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

export default Media
