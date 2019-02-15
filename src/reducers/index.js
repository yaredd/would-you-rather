import { combineReducers } from 'redux'
import users from './users'
import authedUserId from './authedUser'
import answeredQuestions from './answeredQuestions'
import unAnsweredQuestions from './unAnsweredQuestions'
import currentQuestion from './currentQuestion'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({ questions, users, authedUserId, 
                unAnsweredQuestions, answeredQuestions,
                 currentQuestion, loadingBar: loadingBarReducer})