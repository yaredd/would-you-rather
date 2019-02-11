import { GET_ALL_USERS } from "../actions/users";
import { SAVE_QUESTION_ANSWER } from "../actions/questions";

const users = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, ...action.users } 
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                [action.authedUser]: {...state[action.authedUser], 
                                        answers: {...state[action.authedUser].answers, 
                                          [action.qid]: action.answer }}
            }
        default:
            return { ...state }
    }
}

export default users