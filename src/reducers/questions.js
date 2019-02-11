import { GET_ALL_QUESTIONS } from '../actions/questions'


const questions = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                ...action.questions
            } 
    
        default:
            return { ...state }
    }
}

export default questions