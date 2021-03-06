import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const GET_UNANSWERED_QUESTIONS = 'GET_UNANSWERED_QUESTIONS'
export const GET_ANSWERED_QUESTIONS = 'GET_ANSWERED_QUESTIONS'
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'

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

function getQuestionsAction(questions) {
    return (
        {
            type: GET_ALL_QUESTIONS,
            questions
        }
    )
}

function getAnsweredQuestionsByUser(user) {
    return _getQuestions().then((questions) => {
        const allIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        const AnsweredQuestionIds = allIds.filter( (qId) => questions[qId].optionOne.votes.concat(questions[qId].optionTwo.votes).includes(user))
        const AnsweredQuestions = {}
        AnsweredQuestions.allIds = AnsweredQuestionIds
        AnsweredQuestions.byId = {}
        AnsweredQuestionIds.forEach((qId) => {
            AnsweredQuestions.byId[qId] = { ...questions[qId]}
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

function saveAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_QUESTION_ANSWER,
        answer,
        qid,
        authedUser
    }
}

function newQuestion(question) {
    return {
        type: NEW_QUESTION,
        question
    }
}

export function saveNewQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        return (
            _saveQuestion(question)
            .then((question) => {
                dispatch(newQuestion(question))
                dispatch(hideLoading())
            })
        ) 
    }
}

export function saveQuestionAnswer({authedUser, qid, answer}) {
    return (dispatch) => {
        dispatch(showLoading())
        return (
            _saveQuestionAnswer({authedUser, qid, answer})
            .then((result) => {
                dispatch(saveAnswer({authedUser, qid, answer}))
                dispatch(hideLoading())
            })
        )
    }
}

export function setCurrentQuestion(authedUserId, question) {
    return {
        type: SET_CURRENT_QUESTION,
        question,
        authedUserId
    }
}

export function getAllQuestions() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions()
                .then((questions) => {
                    dispatch(getQuestionsAction(questions))
                    dispatch(hideLoading())
                    return questions
                })
    }
}

export function setCurrentQuestionById(authedUserId, qid) {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions()
            .then((questions) => {
                dispatch(setCurrentQuestion(authedUserId, questions[qid]))
                dispatch(hideLoading())
            })
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