import {Avatar} from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'

const UserBar = props => {
  const {onClick, selectedUser} = props
  return (
    <div className="userBar">
      <div className="userBar__left">
        <div className="userBar__left__left">
          <Avatar alt={selectedUser.firstName} src={selectedUser.imageUrl} />
        </div>
        <div className="userBar__left__right">
          {selectedUser.firstName} {selectedUser.lastName}
        </div>
      </div>
      <div className="userBar__right">
        <button type="button" onClick={onClick}>
          i
        </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(UserBar)
