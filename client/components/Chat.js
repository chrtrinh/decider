import React, {useEffect, useRef, useState} from 'react'
import Message from './Message'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import {connect} from 'react-redux'
import {css} from 'emotion'
import {updateUser} from '../store/selectedUser'
import ScrollToBottom from 'react-scroll-to-bottom'

const ROOT_CSS = css({
  height: 600
})

const Chat = props => {
  const {selectedUser, user} = props
  const {messages} = selectedUser
  const [input, setInput] = useState('')

  return (
    <div className="chat">
      <div className="chat__top">
        <ScrollToBottom className={ROOT_CSS}>
          {messages
            ? messages.map((message, iter) => (
                <Message key={iter} message={message} loggedInUser={user} />
              ))
            : null}
        </ScrollToBottom>
      </div>

      <div className="chat__bottom">
        <div className="chat__input">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => props.sendMessage(e, setInput)}
            value={input}
          />
          <button
            type="button"
            value="👍"
            onClick={e => props.sendLike(e, setInput)}
          >
            <ThumbUpIcon value="👍" />
          </button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: userId => dispatch(updateUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Chat)
