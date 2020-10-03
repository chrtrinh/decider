import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const setUser = user => ({type: SET_USER, user})

/**
 * THUNK CREATORS
 */
export const selectUser = user => async dispatch => {
  try {
    dispatch(setUser(user))
  } catch (error) {
    console.error('failed to get inbox')
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}
