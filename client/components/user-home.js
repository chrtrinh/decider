import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Inbox from './Inbox'
import Media from './Media'
import {fetchInbox} from '../store/inbox'
import {
  getUser,
  selectUser,
  sendUpdate,
  updateUser
} from '../store/selectedUser'
import axios from 'axios'
import socket from '../socket'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const [reload, setReload] = useState(false)
  const [reRun, setReRun] = useState(false)

  useEffect(() => {
    props.fetchInbox(props.user.id)
    const getSingle = async () => {
      const {data: results} = await axios.get(
        `/api/users/${props.user.id}/chats`
      )
      const {data} = await axios.get(`/api/users/chats/${props.user.id}`)
      let output = results[0]
      output.messages = data
      props.selectUser(output)
    }

    getSingle()
  }, [])

  useEffect(() => {
    socket.on('refresh', user => {
      const {messages} = user

      props.getUser(user.id)
      socket.emit('changes')
    })

    socket.on('testing', () => {
      props.fetchInbox(props.user.id)
      setReload(!reload)
    })
  }, [])

  const sendMessage = async (e, setInput) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.target.value.length !== 0) {
        await props.updateUser(e.target.value, props.selectedUser.id)
        setInput('')
        socket.emit('test', props.selectedUser)
      } else {
        console.log('BLANK')
      }
    }
  }

  const sendLike = async (e, setInput) => {
    e.preventDefault()
    await props.updateUser('👍', props.selectedUser.id)
    setReload(!reload)
    socket.emit('test', props.selectedUser)
  }

  const {email, inbox} = props

  return (
    <div className="userHome">
      <Inbox />
      <Media inbox={inbox} sendMessage={sendMessage} sendLike={sendLike} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    inbox: state.inbox,
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInbox: userId => dispatch(fetchInbox(userId)),
    selectUser: userId => dispatch(selectUser(userId)),
    updateUser: (message, receiverId) =>
      dispatch(updateUser(message, receiverId)),
    getUser: userId => dispatch(getUser(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
