import { SET_CURRENT_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'


const currentQuestion = (state=null, action) => {
    switch (action.type) {
        case SET_CURRENT_QUESTION:
            const answered = action.question.optionOne.votes.includes(action.authedUserId) || action.question.optionTwo.votes.includes(action.authedUserId)
            return {
                ...action.question,
                answered,
            }
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                answered: true,
                [action.answer]: { ...state[action.answer], votes: state[action.answer].votes.concat([action.authedUser])}
            }
        default:
            return { ...state }
    }
}

export default currentQuestion