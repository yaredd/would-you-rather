import { SET_CURRENT_QUESTION } from '../actions/questions'


const currentQuestion = (state=null, action) => {
    switch (action.type) {
        case SET_CURRENT_QUESTION:
            const answered = action.question.optionOne.votes.includes(action.authedUserId) || action.question.optionTwo.votes.includes(action.authedUserId)
            return {
                ...action.question,
                answered,
            }
        default:
            return { ...state }
    }
}

export default currentQuestion