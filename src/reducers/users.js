import { GET_ALL_USERS } from "../actions/users";

const users = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, ...action.users } 
    
        default:
            return { ...state }
    }
}

export default users