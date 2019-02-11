import { GET_UNANSWERED_QUESTIONS } from '../actions/questions'


const unAnsweredQuestions = (state={}, action) => {
    switch (action.type) {
        case GET_UNANSWERED_QUESTIONS:
            return {
                ...state,
                ...action.questions
            } 
        default:
            return { ...state }
    }
}

export default unAnsweredQuestions