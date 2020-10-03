import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ChatCard from './ChatCard'
import {fetchInbox} from '../store/inbox'

const Inbox = ({inbox, fetchInbox, user}) => {
  // const [chats, setChats] = useState([])

  return (
    <div className="inbox">
      {inbox.map((user, iter) => <ChatCard user={user} key={iter} />)}
    </div>
  )
}

const mapState = state => {
  return {
    inbox: state.inbox,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInbox: userId => dispatch(fetchInbox(userId))
  }
}

export default connect(mapState, mapDispatch)(Inbox)
