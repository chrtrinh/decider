import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Inbox from './Inbox'
import Media from './Media'
import {fetchInbox} from '../store/inbox'
import {selectUser} from '../store/selectedUser'
import axios from 'axios'

/**
 * COMPONENT
 */
export const UserHome = props => {
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

  const {email, inbox} = props

  return (
    <div className="userHome">
      <Inbox />
      <Media inbox={inbox} />
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
    inbox: state.inbox
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInbox: userId => dispatch(fetchInbox(userId)),
    selectUser: userId => dispatch(selectUser(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
