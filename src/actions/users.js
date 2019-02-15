import { _getUsers } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
export const GET_ALL_USERS = 'GET_ALL_USERS'

function getUsers(users) {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export function getAllUsers() {
    return (dispatch) => {
        dispatch(showLoading())
        return (
            _getUsers()
            .then((users) => {
                dispatch(getUsers(users))
                dispatch(hideLoading())
            })
        ) 
    }
}

