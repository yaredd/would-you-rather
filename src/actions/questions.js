import { _getQuestions, generateUID } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
export const GET_UNANSWERED_QUESTIONS = 'GET_UNANSWERED_QUESTIONS'
export const GET_ANSWERED_QUESTIONS = 'GET_ANSWERED_QUESTIONS'
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION'


function getUnAnswered(userId, questions) {
    return {
        type: GET_UNANSWERED_QUESTIONS,
        userId,
        questions
    }
}

function getAnswered(userId, questions) {
    return {
        type: GET_ANSWERED_QUESTIONS,
        userId,
        questions
    }
}

function getQuestions(questions) {
    return (
        {
            type: GET_ALL_QUESTIONS,
            questions
        }
    )
}
  
function _getAllVotes() {
    return _getQuestions().then((questions) => {
        const allIds = Object.keys(questions)
        const allVotes = {}
        allVotes.allIds = []
        allVotes.byId = {}
        allIds.forEach( (q) => {
          let id = generateUID()
          allVotes.byId[id] = {}
          allVotes.byId[id].id = id
          allVotes.byId[id].voters = [ ...new Set(questions[q].optionOne.votes.concat(questions[q].optionTwo.votes)) ]
          allVotes.byId[id].questionId = q
          allVotes.allIds.push(id)
        })
        return allVotes
    })
}

function getAnsweredQuestionsByUser(user) {
    return _getQuestions().then((questions) => {
        const allIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        const AnsweredQuestionIds = allIds.filter( (qId) => questions[qId].optionOne.votes.concat(questions[qId].optionTwo.votes).includes(user))
        const AnsweredQuestions = {}
        AnsweredQuestions.allIds = AnsweredQuestionIds
        AnsweredQuestions.byId = {}
        AnsweredQuestionIds.forEach((qId) => {
            const totalOptionOneVotes = questions[qId].optionOne.votes.length
            const totalOptionTwoVotes = questions[qId].optionTwo.votes.length
            const totalVotes = totalOptionOneVotes + totalOptionTwoVotes
            AnsweredQuestions.byId[qId] = { ...questions[qId], totalVotes, totalOptionOneVotes, totalOptionTwoVotes}
        })
        return AnsweredQuestions
    })
}

function getUnAnsweredQuestionsByUser(user) {
    return _getQuestions().then((questions) => {
        const allIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        const unAnsweredQuestionIds = allIds.filter( (qId) => !questions[qId].optionOne.votes.concat(questions[qId].optionTwo.votes).includes(user))
        const unAnsweredQuestions = {}
        unAnsweredQuestions.allIds = unAnsweredQuestionIds
        unAnsweredQuestions.byId = {}
        unAnsweredQuestionIds.forEach((qId) => {
            unAnsweredQuestions.byId[qId] = { ...questions[qId]}
        })
        return unAnsweredQuestions
    })
}

export function setCurrentQuestion(authedUserId, question) {
    return {
        type: SET_CURRENT_QUESTION,
        question,
        authedUserId
    }
}

export function getAnsweredQuestions(userId) {
    return (dispatch) => {
        dispatch(showLoading())
        return getAnsweredQuestionsByUser(userId).then((questions) => {
            dispatch(getAnswered(userId, questions))
            dispatch(hideLoading())
        })
    }
}

export function getUnAnsweredQuestions(userId) {
    return (dispatch) => {
        dispatch(showLoading())
        return getUnAnsweredQuestionsByUser(userId).then((questions) => {
            dispatch(getUnAnswered(userId, questions))
            dispatch(hideLoading())
        })
    }
}

export function getAllQuestions() {
    return (dispatch) => (
        _getQuestions().then((qs) => dispatch(getQuestions(qs)))
    )
}