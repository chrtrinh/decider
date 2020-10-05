import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Avatar} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  return (
    <div className="navbar">
      <nav>
        {isLoggedIn ? (
          <div className="navbar__container">
            {/* The navbar will show these links after you log in */}

            <div className="navbar__left">
              <Link to="/home">Chat</Link>
            </div>
            <div className="navbar__right">
              <Avatar src={user.imageUrl} />
              <h4>
                {user.firstName.slice(0, 1).toUpperCase() +
                  user.firstName.slice(1)}{' '}
                {user.lastName.slice(0, 1).toUpperCase() +
                  user.lastName.slice(1)}
              </h4>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
