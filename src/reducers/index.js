import { combineReducers } from 'redux'
import users from './users'
import authedUserId from './authedUser'
import questions from './questions'
import answeredQuestions from './answeredQuestions'
import unAnsweredQuestions from './unAnsweredQuestions'
import currentQuestion from './currentQuestion'

export default combineReducers({users, authedUserId, questions, unAnsweredQuestions, answeredQuestions, currentQuestion})