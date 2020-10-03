import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_SELECTED_USER = 'GET_SELECTED_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const setUser = user => ({type: SET_USER, user})
export const getSelect = user => ({type: GET_SELECTED_USER, user})
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

export const sendSelect = update => ({
  type: GET_SELECTED_USER,
  update
})

export const sendUpdate = update => ({
  type: UPDATE_USER,
  update
})

export const updateUser = (message, receiverId) => async dispatch => {
  try {
    const {data} = await axios.post('/api/messages/', {message, receiverId})

    dispatch(sendUpdate(data))
  } catch (error) {
    console.error('failed to update')
  }
}

export const getUser = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/chats/${userId}`)
    dispatch(sendSelect(data))
  } catch (error) {
    console.log('failed to get user')
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case UPDATE_USER:
      let returnState = state
      returnState.messages = [...returnState.messages, action.update]
      return returnState
    case GET_SELECTED_USER:
      let updatedState = state
      updatedState.messages = action.update
      return updatedState
    default:
      return state
  }
}
