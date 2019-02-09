import { _getUsers } from '../utils/_DATA'
export const GET_ALL_USERS = 'GET_ALL_USERS'

function getUsers(users) {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export function getAllUsers() {
    return (dispatch) => {
        return (
            _getUsers()
            .then((users) => {
                return dispatch(getUsers(users))
            })
        ) 
    }
}

