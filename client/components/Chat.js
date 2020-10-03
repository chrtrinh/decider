import React, {useEffect, useState} from 'react'
import Message from './Message'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import {connect} from 'react-redux'

const Chat = props => {
  const {selectedUser} = props
  const {messages} = selectedUser

  const [input, setInput] = useState('')

  const onClick = () => {
    console.log('Liked!')
  }

  return (
    <div className="chat">
      <div className="chat__top">
        {messages ? (
          messages.map((message, iter) => (
            <Message key={iter} message={message} />
          ))
        ) : (
          <h4>loading</h4>
        )}
      </div>
      <div className="chat__bottom">
        <div className="chat__input">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={e => setInput(e.target.value)}
          />
          <ThumbUpIcon onClick={() => onClick()} />
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
  return {}
}

export default connect(mapState, mapDispatch)(Chat)
