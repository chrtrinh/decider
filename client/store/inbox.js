import {CodeSharp} from '@material-ui/icons'
import axios from 'axios'
import setUser from './selectedUser'

/**
 * ACTION TYPES
 */
const GET_INBOX = 'GET_INBOX'

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * ACTION CREATORS
 */
const getInbox = inbox => ({type: GET_INBOX, inbox})

/**
 * THUNK CREATORS
 */
export const fetchInbox = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/chats`)
    dispatch(getInbox(data))
  } catch (error) {
    console.error('failed to get inbox')
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_INBOX:
      return action.inbox
    default:
      return state
  }
}
