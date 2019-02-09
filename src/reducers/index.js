import { combineReducers } from 'redux'
import users from './users'
import authedUserId from './authedUser'

export default combineReducers({users, authedUserId})